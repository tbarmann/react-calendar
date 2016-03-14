var React = require('react');
var helpers = require('./helpers.js');
var EditEventForm = require('./EditEventForm.jsx');
var LastMonthLink = require('./LastMonthLink.jsx');
var NextMonthLink = require('./NextMonthLink.jsx');


   var MonthViewHeader = React.createClass({
    	render: function(){	
    	var monthName = helpers.getNameOfMonth(this.props.month);
        var addEvent = this.props.addEvent;	
    		return(
    			<div>
                    <EditEventForm addEvent={addEvent} displayMonth={this.props.month} displayYear={this.props.year}/>
                    <table className="month-view-header">
        				<tbody>
        					<tr>
        						<td className="last-month-link"><LastMonthLink month={this.props.month} year={this.props.year}/></td>
    					        <td className="month-name">{monthName} {this.props.year}</td>
                				<td className="next-month-link"><NextMonthLink month={this.props.month} year={this.props.year}/></td>
                			</tr>
                		</tbody>
        			</table>
                </div>
    			);
    	}


    });
module.exports = MonthViewHeader;