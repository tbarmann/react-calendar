var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var helpers = require('../js/helpers.js');
var Cell = require('../js/cell.jsx');

      var App = React.createClass({
        getInitialState() {
          return {events:[]};
        },
        componentDidMount () {
          this.loadEvents();
        },

        loadEvents(){
            $.getJSON('./data/events.js',function(data){
               this.setState({events:data});
            }.bind(this))
        },

        render(){
          var month = 3;
          var year = 2016;
          var events = _.filter(this.state.events,function(event){ return event.m == month;});
          return (
              <CalendarMonth month={month} year={year} events={events}/>
          )
        }

      });

  
     var CellDate = React.createClass({
        render(){
          var day = this.props.day;
          return (
            <div className="cell-date">
              {day === null ? "" : day}
            </div>
            )
        }

      });

    var ListEvents = React.createClass({
        render(){
         var events = this.props.events;
          return (
            <ul className="event-list">
              {events.map(function(event,i){
                return(
                  <li className="event" key={i}>{event.t} {event.title}</li>
                  );
                })
              }
              </ul>
          );
        }

      });

    var DaysOfWeek = React.createClass({
       render(){
       var daysFull = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        return (
            <tr className="days-of-week">
                {
                  daysFull.map(function(day,i){
                    return (<td key={i}>{day}</td>);
                  }
                )}
            </tr>
          )

      }


    });


    var CalendarMonth = React.createClass({
      render() {
        var m = parseInt(this.props.month) -1 ; // adjust for 0 based index of months
        var y = parseInt(this.props.year);
        var weeks = helpers.getCalendarMonthArray(m,y);
        var monthName = helpers.getNameOfMonth(m);
        var events = this.props.events;
        return (
          <div className="month-view">
            <div className="month-name">{monthName} {y}</div>
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
                              <CellDate day={day}/>
                              <ListEvents events={todaysEvents}/>
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

window.startCalendar = function(){
	ReactDOM.render(<App/>,document.getElementById('main'));
};


console.log("Loaded");