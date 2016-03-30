var React = require('react');
var CalendarMonthMini = require('./CalendarMonthMini.jsx');
var helpers = require('./helpers.js');
var _ = require('underscore');
const Rebase = require('re-base');
const base = Rebase.createClass('https://react-calendar.firebaseio.com/');
const $ = require('jquery');



const CalendarYear = React.createClass({


     getInitialState() {
        return {
          events: {}
        };
      },

      componentDidMount() {
        this.loadEvents();
        base.syncState('events', {
          context: this,
          state: 'events' });
        base.syncState('history', {
          context: this,
          state: 'history' });
      },

      loadEvents() {
        $.getJSON('/data/events.js', (data) => {
          this.setState({ events: data });
        });
      },


      render: function() {
        var year = parseInt(this.props.params.year, 10);

        return (
          <div className="year-view">
            {_.range(1,13).map((month) => {
            const events = _.filter(this.state.events,
              (event) => event.m === month && event.y === year);
              return (
                  <CalendarMonthMini
                    month={month}
                    year={year}
                    events={events}
                    key={month}
                  />
                );
            })
            }
          </div>
          );

      }

    });
   module.exports = CalendarYear;
