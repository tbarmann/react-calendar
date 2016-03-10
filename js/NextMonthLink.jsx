var React = require('react');

     var NextMonthLink = React.createClass({
     	render: function(){
     		var m = parseInt(this.props.month);
     		var y = parseInt(this.props.year);
     		var lastMonth = m == 12 ? 1 : m+1;
     		var lastYear = m == 12 ? y+1 : y;
     		var href = "/monthView/" + lastYear + "/" + lastMonth;
     		return(<a href={href}>Next month</a>);
     	}

     });

module.exports = NextMonthLink;