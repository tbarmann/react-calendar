 var React = require('react');
 
  var CellDate = React.createClass({
  
      onAddEvent: function(e){
          e.preventDefault();
          var month = this.props.month;
          var year = this.props.year;
          var day = this.props.day;
          var testEvent = { "m": month, "d":day, "y":year, "t": "2pm", "title": "Just a test event"};
          // this.props.addEvent(testEvent);
        },
      render: function(){
        var day = this.props.day;
        
       
        return (
          <div className="cell-date">
            <a href="#" onClick={this.onAddEvent}>{day === null ? "" : day}</a>
          </div>
          )
      }

    });
module.exports = CellDate;