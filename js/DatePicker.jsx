var React = require('react');
var _ = require('underscore');
var MonthPicker = require('./MonthPicker.jsx');
var DayPicker = require('./DayPicker.jsx');
var YearPicker = require('./YearPicker.jsx');
var TimePicker = require('./TimePicker.jsx');

  var DatePicker = React.createClass({

  	render: function (){
      var datePickerDate = this.props.datePickerDate;

      return(
        <span className="date-picker">
          <MonthPicker datePickerDate={datePickerDate} />&nbsp;
          <DayPicker datePickerDate={datePickerDate}/> &nbsp;
          <YearPicker datePickerDate={datePickerDate}/> &nbsp;
          <TimePicker datePickerDate={datePickerDate}/> &nbsp;
        </span>
        );

  	}
  });

  module.exports = DatePicker;
