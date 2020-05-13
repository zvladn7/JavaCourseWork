import React, { Component } from 'react';
import {menubarModel} from "../../model/MenubarModel";
import {observer} from "mobx-react";
import StudentList from "./StudentList";
import '../../css/students-list.css';
import {studentsModel} from "../../model/StudentsModel";
import {loadStudents} from "../actions/students/loadStudents";

@observer
class Students extends Component {

    render() {

        if (menubarModel.isSelectedMenubarItemChanged) {
            menubarModel.redirect(menubarModel.selectedMenubarItem);
        }

        if (!studentsModel.isPresent) {
            loadStudents();
        }

        if (studentsModel.isFilterRequired) {
            studentsModel.filterStudents();
        }

        return <div>
            <h1 className="department__-list-component-header">
                Students
            </h1>
            <StudentList students={studentsModel.filteredStudents}/>
        </div>
    }

}

export default Students;