var React = require('react');
var CellDate = require('./CellDate.jsx');
var ListEvents = require('./ListEvents.jsx');
var DaysOfWeek = require('./DaysOfWeek.jsx');
var MonthViewHeader = require('./MonthViewHeader.jsx');
var helpers = require('./helpers.js');
var _ = require('underscore');




   var CalendarMonth = React.createClass({
      render: function() {
        var m = parseInt(this.props.month); 
        var y = parseInt(this.props.year);
        var weeks = helpers.getCalendarMonthArray(m-1,y); // adjust for 0 based index of months
        var events = this.props.events;
        var addEvent = this.props.addEvent;
        var removeEvent = this.props.removeEvent;
        var setDate = this.props.setDate;
        return (
          <div className="month-view">
          	<MonthViewHeader addEvent={addEvent} month={m} year={y}/>
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
                              <CellDate month={m} year={y} day={day} addEvent={addEvent} setDate={setDate}/>
                              <ListEvents events={todaysEvents} removeEvent={removeEvent}/>
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