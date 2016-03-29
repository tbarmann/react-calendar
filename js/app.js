
const React = require('react');
const ReactDOM = require('react-dom');
import ReactRouter, {Redirect, Router, Route, browserHistory} from 'react-router';
const CalendarMonth = require('./CalendarMonth.jsx');
const CalendarYear = require('./CalendarYear.jsx');
const $ = require('jquery');

const now = new Date();
const defaultPath = `/monthView/${now.getFullYear()}/${parseInt(now.getMonth(), 10) + 1}`;
const routes = (
  <Router history={browserHistory}>
    <Redirect from="/" to={defaultPath} />
    <Route path="/monthView/:year/:month" component={CalendarMonth} />
    <Route path="/yearView/:year" component={CalendarYear} />
    <Redirect from="/monthView/*" to={defaultPath} />

  </Router>
);

$(document).ready(function(){
  ReactDOM.render(routes, document.getElementById('main'));
});



// console.log('Loaded');

