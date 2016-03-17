var React = require('react');
var DatePicker = require('./DatePicker.jsx');
var $ = require('jquery');
var _ = require('underscore');


var EditEventForm =  React.createClass({
	createEvent: function (event) {
		event.preventDefault();
		var thisEvent = {
			id: Date.now()
		};
		function isInteger(v) {
			return v.match(/^\d+$/);
		}

		// get all elements except the submit button
		var elements = _.reject(this.refs.eventForm.elements, function(element) {return element.type === "submit"});

		$.each(elements,function(index,value){
			thisEvent[value.name] = isInteger(value.value) ? parseInt(value.value,10) : value.value;
		});
		this.props.addEvent(thisEvent);
		this.refs.eventForm.reset();
		var redirectTo = "/monthView/" + thisEvent.y + "/" + thisEvent.m;
		if (window.location.pathname !== redirectTo) {
			window.location.pathname = redirectTo;
		}

	},
	render: function(){
		var createEvent = this.createEvent;
		return (
			<form className="event-edit" ref="eventForm" onSubmit={createEvent}>
				<DatePicker />&nbsp;
				<input name="title" type="text" ref="title" placeholder="Title" />
				<button name="submit" value="addItem" type="submit">+ Add Item </button>
			</form>
		)
	}

});
module.exports = EditEventForm;