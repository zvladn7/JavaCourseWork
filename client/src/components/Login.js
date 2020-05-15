import React, { Component } from 'react';
import '../css/login.css';
import {signIn} from "./actions/signIn";
import {userModel} from "../model/UserModel";
import { Redirect } from 'react-router-dom';
import {observer} from "mobx-react";

@observer
class Login extends Component {

    state = {
        username: '',
        password: '',
    }

    onLoginChange = event => {
        this.setState({
            username: event.target.value
        });
        console.log(event.target.value);
    }

    onPasswordChange = event => {
        this.setState({
            password: event.target.value
        });
        console.log(event.target.value);
    }

    onSignInClick = event => {
        event.preventDefault();

        const currentUsername = this.state.username;
        const currentPassword = this.state.password;


        signIn({
            username: currentUsername,
            password: currentPassword
        });

        this.setState({
            username: '',
            password: '',
        });
    }

    render() {

        if (userModel.token !== null) {
            return <Redirect to='/app'/>;
        }

        return  <div className="login-page">

            <div className="menubar">
                <button className="login-page__registration-button">
                    Регистрация
                </button>
            </div>

            <div className="login-page__window" >
                <div className="login-page-frame">
                    <div className="login-page__window-content">
                        <div className="login-page__header">
                            Login
                        </div>
                        <input
                            className="login-page__login"
                            type="email"
                            autoFocus
                            placeholder="логин"
                            name="login"
                            onChange={this.onLoginChange}
                        />
                        <input
                            className="login-page__pass"
                            type="password"
                            placeholder="пароль"
                            name="password"
                            onChange={this.onPasswordChange}
                        />
                        <input
                            className="signIn"
                            type="submit"
                            value="войти"
                            name="signIn"
                            onClick={this.onSignInClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    }

}

export default Login;