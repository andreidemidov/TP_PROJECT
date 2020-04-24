import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register';
import { PrivateRoute } from './components/helpers/PrivateRoute';
import HomeEmployee from './components/Home/HomeEmployee';

const routing = (
    <Router>
        <div>
            <Route path = "/" component = {App}></Route>
            <Route path = "/Login" component = {Login}></Route>          
            <Route path = "/Register" component = {Register}></Route>
            <PrivateRoute path="/HomeEmployee" component = {HomeEmployee}></PrivateRoute>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

