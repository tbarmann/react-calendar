var React = require('react');

  var MonthPicker = React.createClass({
    handleSelect: function(event) {
   		this.setState({month:this.refs.monthPicker.value});
     }, 
	getInitialState : function (){
		return {month:null}

	},
	componentDidMount : function(){
		var now = new Date();
  		var thisMonth = now.getMonth() + 1;	
      	var monthSelected = this.props.month || thisMonth;	
      	this.setState({month:monthSelected});
	},
  	render : function (){

  		var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


  		return (
  				<select  className = "month-picker"ref="monthPicker" value={this.state.month} onChange={this.handleSelect}>
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