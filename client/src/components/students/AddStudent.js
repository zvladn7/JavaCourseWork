import React, { Component } from 'react';
import '../../css/newStudent.css';
import CustomSelect from "../CustomSelect";
import {studentsModel} from "../../model/StudentsModel";
import {groupModel} from "../../model/GroupModel";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {addStudent} from "../actions/students/addStudent";
import {editStudent} from "../actions/students/editStudent";

@observer
class AddStudent extends Component {

    constructor(props) {
        super(props);

        if (studentsModel.studentToEdit === null) {
            this.state = {
                first_name: '',
                last_name: '',
                father_name: '',
                group: null,
            }
        } else {
            this.state = {
                first_name: studentsModel.studentToEdit.first_name,
                last_name: studentsModel.studentToEdit.last_name,
                father_name: studentsModel.studentToEdit.father_name,
                group: {
                    value: studentsModel.studentToEdit.group.name,
                    label: studentsModel.studentToEdit.group.name,
                    id: studentsModel.studentToEdit.group.id
                }
            }
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
        this.setState({
            isRedirect: true
        })
    }

    onFirstNameChange = event => {
        this.setState({
            first_name: event.target.value
        });
    }

    onLastNameChange = event => {
        this.setState({
            last_name: event.target.value
        });
    }

    onFatherNameChange = event => {
        this.setState({
            father_name: event.target.value
        });
    }


    addStudent = () => {
        if (studentsModel.studentToEdit === null) {
            addStudent({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                father_name: this.state.father_name,
                group: studentsModel.selectedGroups,
                type: 'S'
            });
        } else {
            editStudent({
                id: studentsModel.studentToEdit.id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                father_name: this.state.father_name,
                group: studentsModel.selectedGroups.length === 0 ? studentsModel.studentToEdit.group : studentsModel.selectedGroups,
                type: 'S'
            });
        }
        studentsModel.selectedGroups = [];
        studentsModel.isModalWindowOpen = false;
        studentsModel.studentToEdit = null;
        this.onRedirect();
    }

    render() {
        console.log('first name', this.state.first_name);
        console.log('last name', this.state.last_name);
        console.log('father name', this.state.father_name);
        console.log('group', toJS(studentsModel.selectedGroups));
        console.log('student', this.state.isStudent);

        if (studentsModel.isGroupsLoaded) {
            this.onOptionChange();
        }

        return <div className="new-student-page">
            <div className="new-student-page__window" >
                <div className="new-student-page-frame">
                    <div className="new-student-page__window-content">
                        <div className="new-student-page-header">
                            Добавление
                        </div>
                        <input
                            className="new-student-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="имя"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.onFirstNameChange}
                        />
                        <input
                            className="new-student-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="фамилия"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.onLastNameChange}
                        />
                        <input
                            className="new-student-page-frame-cell"
                            type="text"
                            autoFocus
                            placeholder="отчество"
                            name="father_name"
                            value={this.state.father_name}
                            onChange={this.onFatherNameChange}
                        />
                        <CustomSelect
                            options={groupModel.options}
                            isMulti={false}
                            placeholder={'Group'}
                            isGroupSelect={true}
                            selectedGroup={this.state.group}
                        />
                        <input
                            className="createStudent"
                            type="submit"
                            value="Добавить"
                            name="add"
                            onClick={this.addStudent}
                        />
                    </div>
                </div>
            </div>
        </div>
    }

}

export default AddStudent;