 var React = require('react');

   var ListItem = React.createClass({

        getInitialState: function () {
            return {hover: false};
        },

        handleRemoveEvent: function(e){
          e.preventDefault();
          this.props.removeEvent(this.props.event.id);
        },
        mouseOver: function(){
          this.setState({hover: true});
        },
        mouseOut: function(){
          this.setState({hover: false});
        }, 
        render: function(){
          var thisClass = (this.state.hover) ? "delete-button-hover" : "delete-button";
          var event = this.props.event;
          var handleRemoveEvent = this.handleRemoveEvent;
          
          return(
            <li className="event" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
              <span> {event.t} {event.title} </span>
              <span onClick={handleRemoveEvent} className={thisClass}></span>
            </li>
          )
          }
      });
module.exports = ListItem;