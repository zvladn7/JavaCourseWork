import React, { Component } from 'react';
import '../css/login.css';

class Login extends Component {

    state = {
        login: '',
        password: '',
    }

    onLoginChange = event => {
        this.setState({
            login: event.target.value
        });
    }

    onPasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    }

    render() {
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
                        />
                    </div>
                </div>
            </div>
        </div>
    }

}

export default Login;