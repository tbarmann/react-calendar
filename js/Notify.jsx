const React = require('react');
const Notify = React.createClass({

  // getInitialState() {

  // // componentWillReceiveProps(nextProps) {
  // //   console.log(nextProps.props);
  // //   if (nextProps.flash.message) {
  // //     this.setState({message:nextProps.flash.message,type:nextProps.flash.type});
  // //   }
  // // },

  handleClick() {
    this.props.clearFlash();
  },

  render() {
    const showHide = (this.props.flash.message) ? ' show' : ' hide';
    const type = "info";
    let className = `notify ${this.props.flash.type} ${showHide}`;
    return (<div onClick = {this.handleClick} className={className}>
        {this.props.flash.message}
      </div>);
  }
});

module.exports = Notify;
