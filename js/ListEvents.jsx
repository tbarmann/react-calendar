 var React = require('react');

   var ListEvents = React.createClass({

        handleRemoveEvent: function(event){
          this.props.removeEvent(event.target.id);
        }, 
        render: function(){
         var events = this.props.events;
         var handleRemoveEvent = this.handleRemoveEvent;
          return (
            <ul className="event-list">
              {events.map(function(event,i){
                return(
                    <li id={event.id} className="event" key={i}>
                    <span> {event.t} {event.title} </span>
                    <span id={event.id} onClick={handleRemoveEvent} className="delete-button-hover"></span>
                    <span className="edit-button-hover"></span>
                    </li>
                  );
                })
              }
              </ul>
          );
        }

      });
module.exports = ListEvents;