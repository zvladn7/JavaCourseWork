import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Registration from "./components/Registration";
import App from "./App";

class Main extends Component {

    render() {
        return <div className="Main">
            <Router>
                <Switch>
                    <Route path='/' exact component={Login}/>
                    <Route path='/signup' exact component={Registration}/>
                    <Route path='/app' exact component={App}/>
                </Switch>
            </Router>
        </div>
    }

}

export default Main;