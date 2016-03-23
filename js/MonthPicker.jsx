var React = require('react');

  var MonthPicker = React.createClass({

 getInitialState: function () {
    var defaultMonth = parseInt(new Date().getMonth()) + 1;
    return {month:this.props.datePickerDate.month || defaultMonth};
  },

  handleChange: function(e){
    this.setState({month:e.target.value})
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({month: nextProps.datePickerDate.month});
},


  	render : function (){

  		var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


  		return (
  				<select name="m" className = "month-picker" onChange={this.handleChange} value={this.state.month}>
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
