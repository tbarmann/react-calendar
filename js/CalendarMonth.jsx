const React = require('react');
const CellDate = require('./CellDate.jsx');
const ListEvents = require('./ListEvents.jsx');
const DaysOfWeek = require('./DaysOfWeek.jsx');
const MonthViewHeader = require('./MonthViewHeader.jsx');
const helpers = require('./helpers.js');
const _ = require('underscore');
const Rebase = require('re-base');
const base = Rebase.createClass('https://react-calendar.firebaseio.com/');
const $ = require('jquery');
const Flash = require('./Flash');

const CalendarMonth = React.createClass({


      getInitialState() {
        return {
          events: {},
          history: {},
          datePickerDate: {},
          eventToModify: {},
          flash: {}
        };
      },

      componentDidMount() {
        base.syncState('events', {
          context: this,
          state: 'events' });
        base.syncState('history', {
          context: this,
          state: 'history' });
        this.loadEvents();
      },

      setFlash(message, type="info") {
        const flash = {message,type};
        this.setState({flash});
      },

      clearFlash() {
        const flash = {message:"",type:""};
        this.setState({flash});
      },

      loadEvents() {
        $.getJSON('/data/events.js', (data) => {
          _.each(data, (item) => {
            base.post(`events/${item.id}`, {data: item});
          });
        });
      },

      setDatePicker(date) {
        const newState = _.extend({}, this.state);
        newState.datePickerDate = date;
        this.setState(newState);
       // debugger;
      },

      pushHistory(action, event) {
        const historyId = Date.now();
        base.post(`history/${historyId}`, {
          data: { action, event },
        });
      },

      popHistory() {
        if (_.size(this.state.history) > 0) {
          const entryKeys = (_.keys(this.state.history)).sort().reverse();
          const mostRecentEntryKey = entryKeys[0];
          const mostRecentEntry = _.extend({}, this.state.history[mostRecentEntryKey]);
          base.post(`history/${mostRecentEntryKey}`, {
            data: null,
          });
          return mostRecentEntry;
        }
        return null;
      },

      undo() {
        const saveToHistory = false;
        // get most recent entry from history
        const entry = this.popHistory();
        // reverse it
        const action = entry.action;
        switch (action) {
          case 'add':
            this.removeEvent(entry.event.id, saveToHistory);
            break;
          case 'delete':
            this.addEvent(entry.event, saveToHistory);
            break;
          case 'update':
            this.updateEvent(entry.event.oldEvent, saveToHistory);
            break;
          default:
            console.log(`unknown action: ${action}`);
        }
      },

      removeEvent(id, saveToHistory = true) {
        const self = this;
        const event = _.extend({}, this.state.events[id]);
        base.post(`events/${id}`, {
          data: null,
          then() {
            if (saveToHistory === true) {
              self.pushHistory('delete', event);
              self.setFlash(`Event successfully removed: ${event.title}`);
            }
          },
        });
      },

      // rename to prepareForUpdate(id)
      modifyEvent(id) {
        const self = this;
        const event = _.extend({}, this.state.events[id]);
        this.setDatePicker({month:event.m, day:event.d, year:event.y, t:event.t})
        this.setState({eventToModify:event});
      },

      updateEvent(updatedEvent, saveToHistory = true) {
        const self = this;
        const oldEvent = _.extend({}, this.state.events[updatedEvent.id]);
        const entry = {oldEvent: oldEvent, updatedEvent: updatedEvent};
        base.post(`events/${updatedEvent.id}`, {
          data: updatedEvent,
          then() {
            if (saveToHistory === true) {
              self.pushHistory('update',entry);
            }
            self.cancelUpdate();
            self.setFlash(`Event successfully modified: ${updatedEvent.title}`);
          }
        });
      },

      cancelUpdate() {
        this.setState({eventToModify:{}});
      },

      addEvent(event, saveToHistory = true) {
        const self = this;
        base.post(`events/${event.id}`, {
          data: event,
          then() {
            if (saveToHistory === true) {
              self.pushHistory('add', event);
              self.setFlash(`Event successfully added: ${event.title}`);
            }
          },
        });
      },

      render: function() {

        const { params, setDatePicker, modifyEvent } = this.props;
        const { events, history, eventToModify, datePickerDate, flash } = this.state;

        const today = new Date();
        const thisMonth = today.getMonth() + 1; // getMonth() returns 0 to 11
        const thisYear = today.getFullYear();
        const month = parseInt(params.month, 10);
        const year = parseInt(params.year, 10) || thisYear;
        const weeks = helpers.getCalendarMonthArray(month-1,year); // adjust for 0 based index of months
        const historySize = _.size(history);


        return (
          <div className="month-view">
            <Flash
              flash={this.state.flash}
              setFlash={this.setFlash}
              clearFlash={this.clearFlash}
            />
          	<MonthViewHeader
              undo={this.undo}
              historySize={historySize}
              addEvent={this.addEvent}
              month={month}
              year={year}
              datePickerDate={datePickerDate}
              eventToModify={eventToModify}
              cancelUpdate={this.cancelUpdate}
              updateEvent={this.updateEvent}
            />
            <table>
              <tbody>
                <DaysOfWeek/>
                {weeks.map((week, i) => {
                  return (
                    <tr key={i}>
                      {week.map((day, j) => {
                        var todaysEvents = _.filter(events,function(event){
                          return event.d === day && event.m === month && event.y === year
                        });
                        return (
                          <td key={j} className={day === null ? "blank" : "non-blank"}>
                              <CellDate month={month} year={year} day={day} addEvent={this.addEvent} setDatePicker={this.setDatePicker}/>
                              <ListEvents events={todaysEvents} removeEvent={this.removeEvent} modifyEvent={this.modifyEvent} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          );

      }

    });
   module.exports = CalendarMonth;
