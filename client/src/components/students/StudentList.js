import React, { Component } from 'react';
import {studentsModel} from "../../model/StudentsModel";
import StudentListItem from "./StudentListItem";
import {observer} from "mobx-react";
import CustomSelect from "../CustomSelect";
import {groupModel} from "../../model/GroupModel";
import {loadGroups} from "../actions/groups/loadGroups";
import {marksModel} from "../../model/MarksModel";
import {menubarModel} from "../../model/MenubarModel";
import '../../css/students-list.css'

@observer
class StudentList extends Component {

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
        groupModel.options = newOptions;
        studentsModel.dropGroupLoadedFlag();
    }

    onLinkClicked = (person) => {
        marksModel.currentPerson = person;
        menubarModel.isSelectedMenubarItemChanged = true;
        menubarModel.selectedMenubarItem = '3';
    }

    render() {

        if (studentsModel.isGroupsLoaded) {
            this.onOptionChange();
        }

        if (menubarModel.isSelectedMenubarItemChanged) {
            console.log('redirect123', menubarModel.selectedMenubarItem)
            menubarModel.redirect(menubarModel.selectedMenubarItem);
        }

        return <div className="department__students-list">
            <CustomSelect
                options={this.state.options}
                isMulti={true}
                placeholder={'Студенты всех групп'}
                isStudentSelect={true}
                isOpen={this.props.isOpen}
            />
            {
                this.props.students.map((student,index) => {
                    if (student.group === null) {
                        return null;
                    }
                    return <div
                        key={index}
                        // onClick={() => this.onLinkClicked(student)}
                    >
                        <StudentListItem
                            number={index}
                            studentFullName={student.last_name + ' ' + student.first_name + ' ' + student.father_name}
                            group={student.group.name}
                            student={student}
                            onClick={() => this.onLinkClicked(student)}
                        />
                    </div>
                })
            }
        </div>
    }

}

export default StudentList;