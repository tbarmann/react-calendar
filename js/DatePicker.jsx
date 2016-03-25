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
          <MonthPicker datePickerDate={datePickerDate} />
          <DayPicker datePickerDate={datePickerDate}/>
          <YearPicker datePickerDate={datePickerDate}/>
          <TimePicker datePickerDate={datePickerDate}/>
        </span>
        );

  	}
  });

  module.exports = DatePicker;
