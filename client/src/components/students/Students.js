import React, { Component } from 'react';
import {menubarModel} from "../../model/MenubarModel";
import {observer} from "mobx-react";
import StudentList from "./StudentList";
import '../../css/students-list.css';

@observer
class Students extends Component {

    render() {

        if (menubarModel.isSelectedMenubarItemChanged) {
            menubarModel.redirect(menubarModel.selectedMenubarItem);
        }

        return <div>
            <h1 className="department__-list-component-header">
                Students
            </h1>
            <StudentList/>
        </div>
    }

}

export default Students;