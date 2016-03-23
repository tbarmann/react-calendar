var React = require('react');
var CellDate = require('./CellDate.jsx');
var ListEvents = require('./ListEvents.jsx');
var DaysOfWeek = require('./DaysOfWeek.jsx');
var MonthViewHeader = require('./MonthViewHeader.jsx');
var helpers = require('./helpers.js');
var _ = require('underscore');




const CalendarMonth = React.createClass({
      render: function() {
        var month = parseInt(this.props.month);
        var year = parseInt(this.props.year);
        var weeks = helpers.getCalendarMonthArray(month-1,year); // adjust for 0 based index of months
        var events = this.props.events;
        var addEvent = this.props.addEvent;
        var removeEvent = this.props.removeEvent;
        var setDate = this.props.setDate;
        var undo = this.props.undo;
        var historySize = this.props.historySize;
        var datePickerDate = this.props.datePickerDate;
        var setDatePicker = this.props.setDatePicker;
        var modifyEvent = this.props.modifyEvent;


        return (
          <div className="month-view">
          	<MonthViewHeader
              undo={undo}
              historySize={historySize}
              addEvent={addEvent}
              month={month}
              year={year}
              datePickerDate={datePickerDate}
            />
            <table>
              <tbody>
                <DaysOfWeek/>
                {weeks.map(function(week, i) {
                  return (
                    <tr key={i}>
                      {week.map(function(day, j) {
                        var todaysEvents = _.filter(events,function(event){ return event.d == day;});
                        return (
                          <td key={j} className={day === null ? "blank" : "non-blank"}>
                              <CellDate month={month} year={year} day={day} addEvent={addEvent} setDatePicker={setDatePicker}/>
                              <ListEvents events={todaysEvents} removeEvent={removeEvent} modifyEvent={modifyEvent} />
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
