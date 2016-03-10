 var React = require('react');

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
module.exports = ListEvents;