 var React = require('react');

    var LastMonthLink = React.createClass({
     	render: function(){
     		var m = parseInt(this.props.month);
     		var y = parseInt(this.props.year);
     		var lastMonth = m == 1 ? 12 : m -1;
     		var lastYear = m == 1 ? y-1 : y;
     		var href = "/monthView/" + lastYear + "/" + lastMonth;
     		return(<a href={href}>Last month</a>);
     	}

     });

module.exports = LastMonthLink;
