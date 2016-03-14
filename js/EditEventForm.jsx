var React = require('react');
var DatePicker = require('./DatePicker.jsx');
var $ = require('jquery');


var EditEventForm =  React.createClass({
	createEvent : function (event) {
		thisEvent = {};
		event.preventDefault();
		var elements = this.refs.eventForm.elements;
		$.each(elements,function(index,value){
				if (value.type !== "submit") {  // skip the submit button
					thisEvent[value.name] = value.value;
				}

		});
		this.props.addEvent(thisEvent);
		this.refs.eventForm.reset();

	

	},
	render : function(){
		return (
			<form className="event-edit" ref="eventForm" onSubmit={this.createEvent}>
				<DatePicker />&nbsp;
				<input name="title" type="text" ref="title" placeholder="Title" />
				<button name="submit" value="addItem" type="submit">+ Add Item </button>
			</form>
		)
	}

});
module.exports = EditEventForm;