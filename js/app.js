var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var DefaultRoute = ReactRouter.DefaultRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var helpers = require('./helpers.js');
var CalendarMonth = require('./CalendarMonth.jsx');



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

        addEvent : function (event){
        	this.state.events.push(event);
        	this.setState({events:this.state.events});
        },
        render(){
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


	
	// var now = new Date();
	// var defaultPath = "/monthView/" + now.getFullYear + "/" + 

	// var RedirectToDefaultValue = React.createClass({
	//   willTransitionTo (transition, params) {
	//     transition.redirect(`/${params.user}/defaultValue`);
	//   },
	//   render () { return null; }
	// });

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