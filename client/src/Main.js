import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Registration from "./components/Registration";
import App from "./App";
import {userModel} from "./model/UserModel";
import {marksModel} from "./model/MarksModel";
import {menubarModel} from "./model/MenubarModel";

class Main extends Component {

    constructor(props) {
        super(props);

        userModel.token = JSON.parse(localStorage.getItem("token"));
        userModel.person = JSON.parse(localStorage.getItem("person"));
        menubarModel.selectedMenubarItem = JSON.parse(localStorage.getItem("selectedMenubarItem"));
        menubarModel.selectedPage = JSON.parse(localStorage.getItem("selectedPage"));
        marksModel.currentPerson = userModel.person;
        if (menubarModel.selectedPage === null) {
            menubarModel.selectedMenubarItem = '1';
            menubarModel.selectedPage = 'subjects';
        }
    }


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