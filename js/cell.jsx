 var React = require('react');

    var Cell = React.createClass({
        propTypes : {
          event: React.PropTypes.shape({
            d: React.PropTypes.number.isRequired,
            t: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired
          }).isRequired
        },

        render(){
          var event = this.props.event;
          return (
            <table className="cell-table">
              <tbody>
                <tr><td><CellDate day={event.d}/></td></tr>
                <tr><td><CellEvent time={event.t} title={event.title} /></td></tr>
              </tbody>
            </table>
            )
        }

      });
module.exports = Cell;