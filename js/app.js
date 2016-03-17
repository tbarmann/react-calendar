const _ = require('underscore');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Redirect = ReactRouter.Redirect;

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const createBrowserHistory = ReactRouter.browserHistory;
const CalendarMonth = require('./CalendarMonth.jsx');
const Rebase = require('re-base');
const base = Rebase.createClass('https://react-calendar.firebaseio.com/');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    // this.loadEvents();
    base.syncState('events', {
      context: this,
      state: 'events' });
  }

  loadEvents() {
    $.getJSON('/data/events.js', (data) => {
      this.setState({ events: data });
    });
  }
  removeEvent(id) {
    this.state.events[id] = null;
    this.setState({ events: this.state.events });
  }

  addEvent(event) {
    this.state.events[event.id] = event;
    this.setState({ events: this.state.events });
  }

  render() {
    const today = new Date();
    const thisMonth = today.getMonth() + 1; // getMonth() returns 0 to 11
    const thisYear = today.getFullYear();
    const month = parseInt(this.props.params.month, 10) || thisMonth;
    const year = parseInt(this.props.params.year, 10) || thisYear;
    const events = _.filter(this.state.events,
      (event) => event.m === month && event.y === year);
    return (
      <CalendarMonth
        month={month} year={year}
        events={events}
        addEvent={this.addEvent.bind(this)}
        removeEvent={this.removeEvent.bind(this)}
      />
    );
  }
}

App.propTypes = {
  params: React.PropTypes.shape({
    month: React.PropTypes.string.isRequired,
    year: React.PropTypes.string.isRequired,
  }).isRequired,
};

window.startCalendar = () => {
  const now = new Date();
  const defaultPath = `/monthView/${now.getFullYear()}/${parseInt(now.getMonth(), 10) + 1}`;
  const routes = (
    <Router history={createBrowserHistory}>
      <Redirect from="/" to={defaultPath} />
      <Route path="/monthView/:year/:month" component={App} />
      <Redirect from="/monthView/*" to={defaultPath} />

    </Router>
  );


  ReactDOM.render(routes, document.getElementById('main'));
};


// console.log('Loaded');

