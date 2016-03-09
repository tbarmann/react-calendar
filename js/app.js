var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;

var createBrowserHistory = require('history/lib/createBrowserHistory');

var helpers = require('./helpers.js');
var Cell = require('./cell.jsx');

      var App = React.createClass({
        getInitialState() {
          return {events:[]};
        },
        componentDidMount () {
          this.loadEvents();
        },

        loadEvents(){
            $.getJSON('/data/events.js',function(data){
               this.setState({events:data});
            }.bind(this))
        },

        render(){
          var today = new Date();
          var thisMonth = today.getMonth() + 1;
          var thisYear = today.getFullYear();
          var month = this.props.params.month || thisMonth;
          var year = this.props.params.year || thisYear;
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


     var LastMonthLink = React.createClass({
     	render: function(){
     		var lastMonth = parseInt(this.props.month) == 1 ? 12 : parseInt(this.props.month) -1;
     		var lastYear = parseInt(this.props.month) == 1 ? parseInt(this.props.year)-1 : this.props.year;
     		var href = "../" + lastYear + "/" + lastMonth;
     		return(<a href={href}>Last month</a>);
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
          	<LastMonthLink month={this.props.month} year={y}/>
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

	var routes = (
		<Router history={createBrowserHistory()}>
			<Route path="/" component={App} />
			<Route path="/monthView/:year/:month" component={App} />
			<Route path="*" component={App} />

		</Router>
	);


	ReactDOM.render(routes,document.getElementById('main'));
};


console.log("Loaded");