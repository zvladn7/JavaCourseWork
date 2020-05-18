import React, { Component } from 'react';
import {menubarModel} from "../../model/MenubarModel";
import {observer} from "mobx-react";
import StudentList from "./StudentList";
import {studentsModel} from "../../model/StudentsModel";
import {loadStudents} from "../actions/students/loadStudents";
import Modal from "react-modal";
import AddStudent from "./AddStudent";
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
class Students extends Component {


    closeModal = () => {
        studentsModel.isModalWindowOpen = false;
    }

    openModal = () => {
        studentsModel.isModalWindowOpen = true;
    }

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
            <Modal
                style={customUserEditStyles}
                isOpen={studentsModel.isModalWindowOpen}
                onRequestClose={this.closeModal}
            >
                <AddStudent/>
            </Modal>
            <h1 className="department__-list-component-header">
                Студенты
            </h1>
            {userModel.person !== null && userModel.person.type === 'A'
                ? <div className="department__students-list-add">
                    <button
                        className="department__students-list-add-button"
                        onClick={this.openModal}
                    >
                        Добавить студента
                    </button>
                </div>
                : null
            }
            <StudentList
                students={studentsModel.filteredStudents}
            />
        </div>
    }

}

export default Students;