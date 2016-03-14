var React = require('react');
var _ = require('underscore');
var MonthPicker = require('./MonthPicker.jsx');
var DayPicker = require('./DayPicker.jsx');
var YearPicker = require('./YearPicker.jsx');
var TimePicker = require('./TimePicker.jsx');

  var DatePicker = React.createClass({
    
    setDate: function(d) {
      if (d.hasOwnProperty("month")) {
        this.setState({month:d.month});
      }
      if (d.hasOwnProperty("day")) {
        this.setState({day:d.day});

      }
      if (d.hasOwnProperty("year")) {
        this.setState({year:d.year});
      }
    },
  
    getInitialState: function (){
      return {}
    },

    componentDidMount: function(){
      var now = new Date();
      var d = {};
      d.day = this.props.day || now.getDate();
      d.month = this.props.month || now.getMonth()+1;
      d.year = this.props.year || now.getFullYear();

      this.setDate(d);
    },

  	render : function (){
      return(
        <span className="date-picker"><MonthPicker setDate={this.setDate} date={this.state}/> <DayPicker setDate={this.setDate} date={this.state}/> <YearPicker setDate={this.setDate} date={this.state}/> <TimePicker/></span>
        );
 
  	}
  });

  module.exports = DatePicker;