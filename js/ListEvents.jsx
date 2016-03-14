 var React = require('react');

   var ListEvents = React.createClass({
        render: function(){
         var events = this.props.events;
          return (
            <ul className="event-list">
              {events.map(function(event,i){
                return(
                  <li id={event.id} className="event" key={i}>{event.t} {event.title}<span className="delete-button-hover"></span><span className="edit-button-hover"></span></li>
                  );
                })
              }
              </ul>
          );
        }

      });
module.exports = ListEvents;