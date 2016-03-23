var React = require('react');
var _ = require('underscore');
var helpers = require('./helpers.js');
var DayPicker = React.createClass({

getInitialState: function () {
    var defaultDay = new Date().getDate();
    return {day:this.props.datePickerDate.day || defaultDay};
  },

  handleSelect: function(e){
    this.setState({day:e.target.value})
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({day: nextProps.datePickerDate.day});
},

render: function (){

  var defaultDay = this.props.datePickerDate.day || new Date().getDate();
  var defaultMonth = this.props.datePickerDate.month || new Date().getMonth() + 1;
  var defaultYear = this.props.datePickerDate.year || new Date().getFullYear();
  var d = new Date(defaultYear,defaultMonth-1,1);
  var daysInMonth = helpers.getDaysInMonth(d);
  var dayRange = _.range(1,daysInMonth+1);  // _.range end value is not included in the range so it is incremented by 1
	return (
			<select name="d" className = "day-picker" ref="dayPicker" value={this.state.day} onChange={this.handleSelect}>
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
