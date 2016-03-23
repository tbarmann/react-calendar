 var React = require('react');

  var CellDate = React.createClass({

      dateClick: function(e){
          e.preventDefault();
          var month = this.props.month;
          var year = this.props.year;
          var day = this.props.day;
          var thisDate = { "month": month, "day":day, "year":year};
          this.props.setDatePicker(thisDate);
        },
      render: function(){
        var day = this.props.day;


        return (
          <div className="cell-date">
            <a href="#" onClick={this.dateClick}>{day === null ? "" : day}</a>
          </div>
          )
      }

    });
module.exports = CellDate;
