import React, { Component } from 'react';
import '../css/login.css';

class Login extends Component {

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
                        <div className="header">
                            Login
                        </div>
                        <input
                            className="login"
                            type="email"
                            autoFocus
                            placeholder="логин"
                            name="login"
                        />
                        <input
                            className="pass"
                            type="password"
                            placeholder="пароль"
                            name="password"
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