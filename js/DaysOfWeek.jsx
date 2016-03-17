  var React = require('react');

  var DaysOfWeek = React.createClass({
       render: function(){
       var daysFull = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        return (
            <tr className="days-of-week">
                {
                  daysFull.map(function(day,i){
                    return (<td key={i}>{day}</td>);
                  }
                )}
            </tr>
          )

      }


});
 
module.exports = DaysOfWeek;
