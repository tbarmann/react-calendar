 var React = require('react');
 var ListItem = require('./ListItem.jsx');

   var ListEvents = React.createClass({
        render: function(){
         var events = this.props.events;
         var removeEvent = this.props.removeEvent;
          return (
            <ul className="event-list">
              {events.map(function(event,i){
                return(
                    <ListItem key={i} event={event} removeEvent={removeEvent}/>
                  );
                })
              }
              </ul>
          );
        }

      });
module.exports = ListEvents;