var React = require('react');

  var MonthPicker = React.createClass({
    handleSelect: function(event) {
   		this.props.setDate({month:event.target.value});
     }, 
  	render : function (){

  		var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


  		return (
  				<select name="m" className = "month-picker" value={this.props.date.month} onChange={this.handleSelect}>
  					{months.map(function(month,i){
  						return (
  							<option key={i} value={i+1}>{month}</option>
  						);
  					}
  					)}
  				</select>
	  		);
  	}
  });

  module.exports = MonthPicker;