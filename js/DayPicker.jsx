var React = require('react');
var _ = require('underscore');

  var DayPicker = React.createClass({
    
    handleSelect: function(event) {
      this.setState({day:this.refs.dayPicker.value});
     }, 
    
    getInitialState : function (){
    return { 
        day:null,
        isLeapYear: false
      }

  },
  componentDidMount : function(){
    var now = new Date();
      var thisDay = now.getDate(); 
        var daySelected = parseInt(this.props.day || thisDay);  
        this.setState({day:daySelected});
  },

  	render : function (){

      var dayRange = _.range(1,31);
  		return (
  				<select className = "day-picker" ref="dayPicker" value={this.state.day} onChange={this.handleSelect}>
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