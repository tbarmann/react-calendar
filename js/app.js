var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Redirect = ReactRouter.Redirect;

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var DefaultRoute = ReactRouter.DefaultRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var helpers = require('./helpers.js');
var CalendarMonth = require('./CalendarMonth.jsx');
var Rebase = require('re-base');
var base = Rebase.createClass("https://react-calendar.firebaseio.com/")



      var App = React.createClass({
        getInitialState: function () {
          return {events:[{m:null,y:null,d:null,t:null,title:null}]};
        },
        componentDidMount: function () {
        //    this.loadEvents();
  			base.syncState('events', {
			context: this,
			state: 'events'
		})
        },

        loadEvents: function(){
            $.getJSON('/data/events.js',function(data){
               this.setState({events:data});
            }.bind(this))
        },

        addEvent: function (event){
        	console.log(event);
        	this.state.events.push(event);
        	this.setState({events:this.state.events});
        },
        render: function(){
          var today = new Date();
          var thisMonth = today.getMonth() + 1; // getMonth() returns 0 to 11
          var thisYear = today.getFullYear();
          var month = this.props.params.month || thisMonth;
          var year = this.props.params.year || thisYear;
          var events = _.filter(this.state.events,function(event){ return event.m == month && event.y == year;});
          return (
              <CalendarMonth month={month} year={year} events={events} addEvent={this.addEvent}/>
          )
        }

      });




window.startCalendar = function(){


	
	var now = new Date();
	var defaultPath = "/monthView/" + now.getFullYear() + "/" + parseInt(now.getMonth()+1);
	var routes = (
		<Router history={createBrowserHistory()}>
			<Redirect from="/" to={defaultPath} />
			<Route path="/monthView/:year/:month" component={App} />
			<Redirect from="/monthView/*" to={defaultPath} />

		</Router>
	);


	ReactDOM.render(routes,document.getElementById('main'));
};


console.log("Loaded");