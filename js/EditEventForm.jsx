var React = require('react');
var DatePicker = require('./DatePicker.jsx');
var $ = require('jquery');
var _ = require('underscore');


var EditEventForm =  React.createClass({

	getInitialState: function() {
		return {eventToModify: this.props.eventToModify,
				formType: 'create'};
	},

	componentWillReceiveProps: function(nextProps) {
		console.log(nextProps.eventToModify.id);
		if (nextProps.eventToModify.id !== undefined) {
			this.setState({eventToModify:nextProps.eventToModify, formType:'update'});
		}
	},
	handleTitleChange: function(event) {
		var eventToModify = _.extend({},this.state.eventToModify);
		eventToModify.title = event.target.value;
    	this.setState({eventToModify:eventToModify});
  	},
	createEvent: function (e) {
		e.preventDefault();
		var thisEvent = {
			id: Date.now()
		};
		function isInteger(v) {
			return v.match(/^\d+$/);
		}

		// get all elements except the submit button
		var elements = _.reject(this.refs.createForm.elements, function(element) {return element.type === "submit"});

		$.each(elements,function(index,value){
			thisEvent[value.name] = isInteger(value.value) ? parseInt(value.value,10) : value.value;
		});
		this.props.addEvent(thisEvent);
		this.refs.createForm.reset();
		var redirectTo = "/monthView/" + thisEvent.y + "/" + thisEvent.m;
		if (window.location.pathname !== redirectTo) {
			window.location.pathname = redirectTo;
		}

	},
	updateEvent: function(e) {
		e.preventDefault();
		//code to update event


	},
	handleUndo: function(e) {
		e.preventDefault();
		this.props.undo();
	},

	handleCancel: function(e) {
		e.preventDefault();
		this.setState({formType:'create'});
		this.refs.updateForm.reset();
		this.props.cancelUpdate();

	},

	render: function(){
		var createEvent = this.createEvent;
		var updateEvent = this.updateEvent;
		var historySize = this.props.historySize;
		var undoStatus = historySize > 0 ? "" : "disabled";
		var handleUndo = this.handleUndo;
		var handleCancel = this.handleCancel;
		var datePickerDate = this.props.datePickerDate;

		if (this.state.formType === 'create') {
			// create form
			return (
				<form className="event-edit" ref="createForm" onSubmit={createEvent}>
					<DatePicker datePickerDate={datePickerDate}/>&nbsp;
					<input name="title" type="text" ref="title" placeholder="Title" />&nbsp;
					<button name="submit" value="addItem" type="submit">+ Add Item </button>&nbsp;
					<button name="undo" value="undo" type="submit" disabled={undoStatus} onClick={handleUndo}>Undo ({historySize})</button>
				</form>
			)
		}
		// update form
		return (
			<form className="event-edit" ref="updateForm" onSubmit={updateEvent}>
				<DatePicker datePickerDate={datePickerDate}/>&nbsp;
				<input name="title" type="text" ref="title" value={this.state.eventToModify.title} placeholder="Title" onChange={this.handleTitleChange}/>&nbsp;
				<button name="submit" value="addItem" type="submit">Update Item </button>&nbsp;
				<button name="cancel" value="cancel" type="submit" onClick={handleCancel}>Cancel</button>
			</form>
		)
	}

});
module.exports = EditEventForm;
