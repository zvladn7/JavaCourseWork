import React, { Component } from 'react';
import {menubarModel} from "../../model/MenubarModel";
import {observer} from "mobx-react";
import {marksModel} from "../../model/MarksModel";
import "../../css/marks.css";
import MarksList from "./MarksList";
import AddNewMark from "../students/AddNewMark";
import Modal from "react-modal";
import {userModel} from "../../model/UserModel";

const customUserEditStyles = {
    content: {
        padding: '12%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin: '0 auto',
        width: '460px',
        minWidth: '460px',
        height: '560px',
    }
};

@observer
class Marks extends Component {

    constructor(props) {
        super(props);
        marksModel.currentPerson = JSON.parse(localStorage.getItem("currentPerson"));
        if (marksModel.currentPerson === null) {
            marksModel.currentPerson = userModel.person;
        }
    }

    closeNewMarkModal = () => {
        marksModel.isNewMarkModalOpen = false;
        marksModel.isEditMark = false;
        marksModel.selectedValue = null;
        marksModel.selectedSubject = null;
    }

    render() {
        if (menubarModel.isSelectedMenubarItemChanged) {
            menubarModel.redirect(menubarModel.selectedMenubarItem);
        }

        return <div className="marks-page">
            <Modal
                style={customUserEditStyles}
                isOpen={marksModel.isNewMarkModalOpen}
                onRequestClose={this.closeNewMarkModal}
            >
                <AddNewMark/>
            </Modal>
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
