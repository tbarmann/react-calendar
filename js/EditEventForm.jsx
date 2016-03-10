var React = require('react');
var MonthPicker = require('./MonthPicker.jsx');
var DayPicker = require('./DayPicker.jsx');
var YearPicker = require('./YearPicker.jsx');

var EditEventForm =  React.createClass({
	createEvent : function () {
		return;
	},
	render : function(){
		return (
			<form className="event-edit" ref="eventForm" onSubmit={this.createEvent}>
				<MonthPicker/> <DayPicker/> <YearPicker/>&nbsp;
				<input type="text" ref="t" placeholder="Time" />
				<input type="text" ref="title" placeholder="Title" />
				<button type="submit">+ Add Item </button>
			</form>
		)
	}

});
module.exports = EditEventForm;