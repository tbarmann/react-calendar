var React = require('react');
var _ = require('underscore');

 var YearPicker = React.createClass({


    handleSelect: function(event) {
      this.props.setDate({year:event.target.value});
     }, 
    
  	render: function (){
        var yearRange = [];
        if (this.props.date.year !== undefined) {
          var startYear = parseInt(this.props.date.year) -5 ;
          var endYear = parseInt(this.props.date.year) + 5;
        	var yearRange = _.range(startYear,endYear);
        }

  		return (
  				<select className = "year-picker" ref="yearPicker" value={this.props.date.year} onChange={this.handleSelect}>
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