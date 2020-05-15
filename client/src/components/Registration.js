import React, { Component } from 'react';
import '../css/registration.css';
import CustomSelect from "./CustomSelect";
import {loadGroups} from "./actions/groups/loadGroups";
import {studentsModel} from "../model/StudentsModel";
import {groupModel} from "../model/GroupModel";
import {observer} from "mobx-react";

@observer
class Registration extends Component {

    constructor(props) {
        super(props);

        loadGroups();
        studentsModel.selectedGroups = [];

        this.state = {
            options: []
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

    render() {

        if (studentsModel.isGroupsLoaded) {
            this.onOptionChange();
        }

        return <div className="registration-page">

            <div className="menubar">
                <button className="registration-page__singup-button">
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
                            name="login"
                        />
                        <input
                            className="pass"
                            type="password"
                            placeholder="пароль"
                            name="password"
                        />
                        <input
                            className="registration-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="имя"
                            name="first_name"
                        />
                        <input
                            className="registration-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="фамилия"
                            name="last_name"
                        />
                        <input
                            className="registration-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="отчество"
                            name="father_name"
                        />
                        <CustomSelect
                            options={this.state.options}
                            isMulti={true}
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
                                    value={this.state.isPrivate}
                                    tabIndex="6"
                                    onChange={this.onPrivateClick}
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
                        />
                    </div>
                </div>
            </div>
        </div>
    }

}

export default Registration;