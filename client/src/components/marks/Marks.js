import React, { Component } from 'react';
import {menubarModel} from "../../model/MenubarModel";
import {observer} from "mobx-react";
import {marksModel} from "../../model/MarksModel";
import "../../css/marks.css";
import MarksList from "./MarksList";

@observer
class Marks extends Component {

    render() {
        if (menubarModel.isSelectedMenubarItemChanged) {
            menubarModel.redirect(menubarModel.selectedMenubarItem);
        }

        return <div className="marks-page">
            <h1 className="department__-list-component-header">
                Оценки
            </h1>
            <h2 className="marks-page-person-name">
                {marksModel.currentPerson.lastname + ' ' + marksModel.currentPerson.firstname + ' ' + marksModel.currentPerson.fathername}
            </h2>
            <MarksList/>
        </div>
    }

}

export default Marks;
