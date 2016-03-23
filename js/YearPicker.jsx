var React = require('react');
var _ = require('underscore');

 var YearPicker = React.createClass({


getInitialState: function () {
  var defaultYear = new Date().getFullYear();
  return {year:this.props.datePickerDate.year || defaultYear};
},

handleSelect: function(e){
  this.setState({year:e.target.value})
},

componentWillReceiveProps: function(nextProps) {
    this.setState({year: nextProps.datePickerDate.year});
},


  	render: function (){

        var defaultYear = new Date().getFullYear() || this.state.year
        var startYear = parseInt(defaultYear) -5 ;
        var endYear = parseInt(defaultYear) + 6;
        var yearRange = _.range(startYear,endYear);

  		return (
  				<select name="y" className = "year-picker" ref="yearPicker" value={this.state.year} onChange={this.handleSelect}>
  					{ yearRange.map(function(year,i){
  						return (
  							<option key={i} value={year}>{year}</option>
  							);
  					})
  				}
  				</select>

	  		);
  	}
  });

  module.exports = YearPicker;
