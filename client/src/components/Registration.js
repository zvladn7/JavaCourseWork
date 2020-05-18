import React, { Component } from 'react';
import '../css/registration.css';
import CustomSelect from "./CustomSelect";
import {loadGroups} from "./actions/groups/loadGroups";
import {studentsModel} from "../model/StudentsModel";
import {groupModel} from "../model/GroupModel";
import {observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import {toJS} from "mobx";
import {signUp} from "./actions/signUp";
import {userModel} from "../model/UserModel";

@observer
class Registration extends Component {

    constructor(props) {
        super(props);

        loadGroups();
        studentsModel.selectedGroups = [];
        userModel.isRedirect = false;


        this.state = {
            options: [],
            username: null,
            password: null,
            first_name: null,
            last_name: null,
            father_name: null,
            group: '',
            isStudent: true
        }
    }

    onOptionChange = () => {
        const newOptions = groupModel.groups.map(group => {
            return {
                value: group.name,
                label: group.name,
                id: group.id
            }
        });
        this.setState({
            options: newOptions
        })
        studentsModel.dropGroupLoadedFlag();
        console.log(newOptions)
    }

    onRedirect = () => {
        userModel.isRedirect = true;
    }

    onUsernameChange = event => {
        this.setState({
            username: event.target.value
        });
        document.getElementById("registration-page-warning").style.visibility = 'hidden';
        userModel.isRegistrationSucceed = true;
    }

    onPasswordChange = event => {
        this.setState({
            password: event.target.value
        });
        document.getElementById("registration-page-warning").style.visibility = 'hidden';
        userModel.isRegistrationSucceed = true;
    }

    onFirstNameChange = event => {
        this.setState({
            first_name: event.target.value
        });
        document.getElementById("registration-page-warning").style.visibility = 'hidden';
        userModel.isRegistrationSucceed = true;
    }

    onLastNameChange = event => {
        this.setState({
            last_name: event.target.value
        });
        document.getElementById("registration-page-warning").style.visibility = 'hidden';
        userModel.isRegistrationSucceed = true;
    }

    onFatherNameChange = event => {
        this.setState({
            father_name: event.target.value
        });
        document.getElementById("registration-page-warning").style.visibility = 'hidden';
        userModel.isRegistrationSucceed = true;
    }

    onToggleClick = () => {
        this.setState({
            isStudent: !this.state.isStudent
        });
    }

    onSignUp = () => {
        if (this.state.username !== null && this.state.username !== ''
            && this.state.password !== null && this.state.password !== ''
            && this.state.first_name !== null && this.state.first_name !== ''
            && this.state.last_name !== null && this.state.last_name !== ''
            && this.state.father_name !== null && this.state.father_name !== ''
            && studentsModel.selectedGroups.length !== 0
        ) {
            signUp({
                username: this.state.username,
                password: this.state.password,
                student: this.state.isStudent,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                father_name: this.state.father_name,
                group: studentsModel.selectedGroups
            }, document.getElementById("registration-page-warning"))
        } else {
            document.getElementById("registration-page-warning").style.visibility = 'visible';
        }
    }

    render() {
        console.log('username', this.state.username);
        console.log('password', this.state.password);
        console.log('first name', this.state.first_name);
        console.log('last name', this.state.last_name);
        console.log('father name', this.state.father_name);
        console.log('group', toJS(studentsModel.selectedGroups));
        console.log('student', this.state.isStudent);

        if (userModel.isRedirect) {
            return <Redirect to='/'/>;
        }

        if (studentsModel.isGroupsLoaded) {
            this.onOptionChange();
        }

        return <div className="registration-page">

            <div className="menubar">
                <button
                    className="registration-page__singup-button"
                    onClick={this.onRedirect}
                >
                    Вход
                </button>
            </div>

            <div className="registration-page__window" >
                <div className="registration-page-frame">
                    <div className="registration-page__window-content">
                        <div className="registration-page-header">
                            Registration
                        </div>
                        <input
                            className="registration-page-frame-cell"
                            type="email"
                            autoFocus
                            placeholder="логин"
                            name="username"
                            onChange={this.onUsernameChange}
                        />
                        <input
                            className="pass"
                            type="password"
                            placeholder="пароль"
                            name="password"
                            onChange={this.onPasswordChange}
                        />
                        <input
                            className="registration-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="имя"
                            name="first_name"
                            onChange={this.onFirstNameChange}
                        />
                        <input
                            className="registration-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="фамилия"
                            name="last_name"
                            onChange={this.onLastNameChange}
                        />
                        <input
                            className="registration-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="отчество"
                            name="father_name"
                            onChange={this.onFatherNameChange}
                        />
                        <CustomSelect
                            options={this.state.options}
                            isMulti={false}
                            placeholder={'Group'}
                            isGroupSelect={true}
                        />
                        <div className="registration-page-frame__toggle-container">
                            <div
                                className="registration-page-frame__toggle-container_option"
                            >
                                Student
                            </div>
                            <label
                                className="toggle-switch"
                                id="toggle"
                            >
                                <input
                                    name="private-event-toggle"
                                    type="checkbox"
                                    form="new-event-form"
                                    // value={this.state.isPrivate}
                                    tabIndex="6"
                                    onChange={this.onToggleClick}
                                />
                                <span></span>
                            </label>
                            <div
                                className="registration-page-frame__toggle-container_option"
                            >
                                Teacher
                            </div>
                        </div>
                        <input
                            className="signUp"
                            type="submit"
                            value="Зарегистрироваться"
                            name="signUp"
                            onClick={this.onSignUp}
                        />
                        <p
                            id="registration-page-warning"
                            className="registration-page-page-warning"
                        >
                            {userModel.isRegistrationSucceed ? 'Заполните все поля' : 'Пользователь уже существует'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    }

}

export default Registration;