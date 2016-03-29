import React from 'react';
import DaysOfWeek from './DaysOfWeek';
import helpers from './helpers';
import _ from 'underscore';

const CalendarMonthMini = React.createClass({

      render: function() {
        var month = parseInt(this.props.month);
        var year = parseInt(this.props.year);
        var weeks = helpers.getCalendarMonthArray(month-1,year); // adjust for 0 based index of months
        var events = this.props.events;
        var daysOfWeek = ['S','M','T','W','T','F','S'];

        return (
          <div className="month-mini-view">
            <div className="month-mini-header">{helpers.getNameOfMonth(month)} {year}</div>
            <table>
              <tbody>
                <tr className="days-of-week">
                  {daysOfWeek.map(function(day,i){
                    return (<td key={i}>{day}</td>);
                  })
                  }
                </tr>
                {weeks.map(function(week, i) {
                  return (
                    <tr key={i}>
                      {week.map(function(day, j) {
                        var todaysEvents = _.filter(events,function(event){ return event.d == day;});
                        return (
                          <td key={j} className={day === null ? "blank" : "non-blank"}>
                              <span className={todaysEvents.length>0 ? "has-events" : ""}>{day}</span>
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
   module.exports = CalendarMonthMini;
