const React = require('react');
const Flash = React.createClass({

  handleClick() {
    this.props.clearFlash();
  },

  render() {
    const showHide = (this.props.flash.message) ? ' show' : ' hide';
    const className = `notify ${this.props.flash.type} ${showHide}`;
    return (
              <div onClick = {this.handleClick} className={className}>
                {this.props.flash.message}
              </div>);
  }
});

module.exports = Flash;
