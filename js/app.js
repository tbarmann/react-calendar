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
    this.state = {
      events: {},
      history: {},
      datePickerDate: {},
    };
  }

  componentDidMount() {
    this.loadEvents();
    base.syncState('events', {
      context: this,
      state: 'events' });
    base.syncState('history', {
      context: this,
      state: 'history' });
  }

  setDatePicker(date) {
    const newState = _.extend({}, this.state);
    newState.datePickerDate = date;
    this.setState(newState);
   // debugger;
  }

  pushHistory(action, event) {
    const historyId = Date.now();
    base.post(`history/${historyId}`, {
      data: { action, event },
    });
  }

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
  }

  undo() {
    const saveToHistory = false;
    // get most recent entry from history
    const entry = this.popHistory();
    // reverse it
    const action = entry.action;
    // debugger;
    switch (action) {
      case 'add':
        this.removeEvent(entry.event.id, saveToHistory);
        break;
      case 'delete':
        this.addEvent(entry.event, saveToHistory);
        break;
      default:
        console.log(`unknown action: ${action}`);
    }
  }

  loadEvents() {
    $.getJSON('/data/events.js', (data) => {
      this.setState({ events: data });
    });
  }

  removeEvent(id, saveToHistory = true) {
    const self = this;
    const event = _.extend({}, this.state.events[id]);
    // debugger;
    base.post(`events/${id}`, {
      data: null,
      then() {
        if (saveToHistory === true) {
          self.pushHistory('delete', event);
        }
      },
    });
  }

  addEvent(event, saveToHistory = true) {
    const self = this;
    base.post(`events/${event.id}`, {
      data: event,
      then() {
        if (saveToHistory === true) {
          self.pushHistory('add', event);
        }
      },
    });
  }

  render() {
    const today = new Date();
    const datePickerDate = this.state.datePickerDate;
    const thisMonth = today.getMonth() + 1; // getMonth() returns 0 to 11
    const thisYear = today.getFullYear();
    const month = parseInt(this.props.params.month, 10) || thisMonth;
    const year = parseInt(this.props.params.year, 10) || thisYear;
    const historySize = _.size(this.state.history);
    const events = _.filter(this.state.events,
      (event) => event.m === month && event.y === year);
    return (
      <CalendarMonth
        month={month} year={year}
        events={events}
        addEvent={this.addEvent.bind(this)}
        removeEvent={this.removeEvent.bind(this)}
        historySize={historySize}
        undo={this.undo.bind(this)}
        datePickerDate={datePickerDate}
        setDatePicker={this.setDatePicker.bind(this)}
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

