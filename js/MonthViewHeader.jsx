var React = require('react');
var helpers = require('./helpers.js');
var EditEventForm = require('./EditEventForm.jsx');
var LastMonthLink = require('./LastMonthLink.jsx');
var NextMonthLink = require('./NextMonthLink.jsx');

   var MonthViewHeader = React.createClass({
    	render: function(){	
    	var monthName = helpers.getNameOfMonth(this.props.month);	
    		return(
    			<div>
                    <EditEventForm />
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