import React, { Component } from 'react';
import {studentsModel} from "../../model/StudentsModel";
import StudentListItem from "./StudentListItem";
import {observer} from "mobx-react";
import CustomSelect from "../CustomSelect";
import {groupModel} from "../../model/GroupModel";
import {loadGroups} from "../actions/groups/loadGroups";

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

    render() {

        if (studentsModel.isGroupsLoaded) {
            this.onOptionChange();
        }

        return <div className="department__students-list">
            <CustomSelect
                options={this.state.options}
                isMulti={true}
                placeholder={'All groups selected'}
            />
            {
                this.props.students.map((student,index) => {
                    return <StudentListItem
                        key={student.id}
                        number={index}
                        studentFullName={student.last_name + ' ' + student.first_name + ' ' + student.father_name}
                        group={student.group.name}
                    />
                })
            }
        </div>
    }

}

export default StudentList;