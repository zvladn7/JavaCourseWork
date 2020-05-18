import React, { Component } from 'react';
import {observer} from "mobx-react";
import {userModel} from "../../model/UserModel";
import {studentsModel} from "../../model/StudentsModel";
import {marksModel} from "../../model/MarksModel";

@observer
class StudentListItem extends Component {

    onStudentEdit = () => {
        studentsModel.isModalWindowOpen = true;
        studentsModel.studentToEdit = this.props.student;
    }

    onNewMarkClick = () => {
        marksModel.isNewMarkModalOpen = true;
        marksModel.studentToNewMark = this.props.student;
    }

    render() {
        return <div className="student-list-item">
            <div
                className="student-list-item__number"
                onClick={this.props.onClick}
            >
                {this.props.number + 1}
            </div>
            <div
                className="student-list-item__info"
                onClick={this.props.onClick}
            >
                <div className="student-list-item__info-group">
                    {this.props.group}
                </div>
                <div className="student-list-item__info-fio">
                    {this.props.studentFullName}
                </div>
            </div>
            { userModel.person !== null
                && (userModel.person.type === 'A'
                || userModel.person.type === 'T')
                ? <button
                    className="student-list-item__add-mark"
                    onClick={ this.onNewMarkClick }
                >
                    Поставить<br/>оценку
                </button>
                : null
            }
            {userModel.person !== null && userModel.person.type === 'A'
                ? <button
                    className="student-list-item__edit"
                    onClick={ this.onStudentEdit }
                >
                    Изменить
                </button>
                : null
            }
        </div>
    }

}

export default StudentListItem;