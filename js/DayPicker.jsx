var React = require('react');
var _ = require('underscore');
var helpers = require('./helpers.js');


  
  var daysInMonth = 0;
  var DayPicker = React.createClass({
    
    handleSelect: function(event) {
      this.props.setDate({day:event.target.value});
     }, 
    
  	render : function (){

      if ((this.props.date.month !== undefined) && (this.props.date.year !== undefined)) {
          var d = new Date(this.props.date.year,this.props.date.month-1,1); 
          daysInMonth = helpers.getDaysInMonth(d);
        }

      var dayRange = _.range(1,daysInMonth+1);  // _.range end value is not included in the range so it is incremented by 1
  		return (
  				<select name="d" className = "day-picker" ref="dayPicker" value={this.props.date.day} onChange={this.handleSelect}>
  					{ dayRange.map(function(day,i){
  						return (
  							<option key={i} value={day}>{day}</option>
  							);
  					})
  				}
  				</select>
	  		);
  	}
  });

  module.exports = DayPicker;