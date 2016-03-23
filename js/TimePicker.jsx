var React = require('react');
var _ = require('underscore');

 var TimePicker = React.createClass({

	minutesToStr: function(min){
        	var ampm = min < 720 ? "a" : "p";
        	var hours = parseInt(min/60);
        	hours = hours >=13 ? hours - 12 : hours === 0 ? 12 : hours;
        	var remainder = "0" + min%60;
        	return hours + ":" + remainder.slice(-2) + ampm;
    },

  	render: function (){

        var minutesToStr = this.minutesToStr;
        var minutes = _.range(0,1440,5);
        var timeArr = minutes.map(function(v){
        	return minutesToStr(v);
        });

  		return (
  				<select name="t" className = "time-picker" ref="timePicker">
  					{ timeArr.map(function(t,i){
  						return (
  							<option key={i} value={t}>{t}</option>
  							);
  					})
  				}
  				</select>

	  		);
  	}
  });

  module.exports = TimePicker;
