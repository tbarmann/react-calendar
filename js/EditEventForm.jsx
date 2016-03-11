var React = require('react');
var DatePicker = require('./DatePicker.jsx');

var EditEventForm =  React.createClass({
	createEvent : function () {
		return;
	},
	render : function(){
		return (
			<form className="event-edit" ref="eventForm" onSubmit={this.createEvent}>
				<DatePicker />&nbsp;
				<input type="text" ref="t" placeholder="Time" />
				<input type="text" ref="title" placeholder="Title" />
				<button type="submit">+ Add Item </button>
			</form>
		)
	}

});
module.exports = EditEventForm;