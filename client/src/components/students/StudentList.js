import React, { Component } from 'react';
import {studentsModel} from "../../model/StudentsModel";
import StudentListItem from "./StudentListItem";
import {observer} from "mobx-react";
import CustomSelect from "../CustomSelect";
import {groupModel} from "../../model/GroupModel";
import {loadGroups} from "../actions/groups/loadGroups";
import {toJS} from "mobx";
import {marksModel} from "../../model/MarksModel";
import {menubarModel} from "../../model/MenubarModel";

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
                placeholder={'All groups selected'}
                isStudentSelect={true}
            />
            {
                this.props.students.map((student,index) => {
                    return <div onClick={() => this.onLinkClicked(student)}>
                        <StudentListItem
                            key={student.id}
                            number={index}
                            studentFullName={student.last_name + ' ' + student.first_name + ' ' + student.father_name}
                            group={student.group.name}
                        />
                    </div>
                })
            }
        </div>
    }

}

export default StudentList;