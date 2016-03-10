var React = require('react');
var _ = require('underscore');

 var YearPicker = React.createClass({


     handleSelect: function(event) {
      this.setState({year:this.refs.yearPicker.value});
     }, 
    
    getInitialState : function (){
    return { 
        year:null
      }

  },
  componentDidMount : function(){
    	var now = new Date();
      	var thisYear = now.getFullYear(); 
        var yearSelected = parseInt(this.props.year || thisYear);  
        this.setState({year:yearSelected});
  },

  	render : function (){
      	var yearRange = _.range(this.state.year-5,this.state.year+5);

  		return (
  				<select className = "year-picker" ref="yearPicker" value={this.state.year} onChange={this.handleSelect}>
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