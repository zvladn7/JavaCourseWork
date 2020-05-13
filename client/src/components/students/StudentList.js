import React, { Component } from 'react';
import {studentsModel} from "../../model/StudentsModel";
import StudentListItem from "./StudentListItem";
import {loadStudents} from "../actions/students/loadStudents";
import {observer} from "mobx-react";

@observer
class StudentList extends Component {

    render() {

        if (!studentsModel.isPresent) {
            loadStudents();
        }

        return <div className="department__students-list">
            {
                studentsModel.students.map((student,index) => {
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