import React, { Component } from 'react';
import '../../css/addNewMark.css';
import CustomSelect from "../CustomSelect";
import {observer} from "mobx-react";
import {subjectModel} from "../../model/SubjectModel";
import {loadSubject} from "../actions/subjects/loadSubjects";
import {marksModel} from "../../model/MarksModel";
import {createNewMark} from "../actions/marks/createNewMark";
import {userModel} from "../../model/UserModel";
import {toJS} from "mobx";

const marksOptions = [
    {value: 5, label: 'Отлично'},
    {value: 4, label: 'Хорошо'},
    {value: 3, label: 'Удовлетворительно'},
    {value: 2, label: 'Неудовлетворительно'},
];

@observer
class AddNewMark extends Component {

    constructor(props) {
        super(props);

        loadSubject();
        subjectModel.selectedSubject = null;

        this.state = {
            options: []
        }
    }

    onOptionChange = () => {
        const newOptions = subjectModel.subjects.map(subject => {
            return {
                value: subject.name,
                label: subject.name,
                id: subject.id
            }
        });
        this.setState({
            options: newOptions
        })
        marksModel.dropSubjectLoadedFlag();
    }



    addMark = () => {
        if (marksModel.selectedValue !== null && marksModel.selectedSubject !== null) {
            createNewMark({
                student: marksModel.studentToNewMark,
                subject: marksModel.selectedSubject,
                teacher: userModel.person,
                value: marksModel.selectedValue
            })
            marksModel.selectedValue = null;
            marksModel.selectedValue = null;
            marksModel.isNewMarkModalOpen = false;
        } else {
            document.getElementById("new-student-mark-page-warning").style.visibility = 'visible';
        }
    }

    render() {

        console.log('student', toJS(marksModel.studentToNewMark));
        console.log('subject', marksModel.selectedSubject);
        console.log('teacher', toJS(userModel.person));
        console.log('value', marksModel.selectedValue);

        if (marksModel.isSubjectLoaded) {
            this.onOptionChange();
        }

        return <div className="new-student-mark-page">
            <div className="new-student-mark-page__window" >
                <div className="new-student-mark-page-frame">
                    <div className="new-student-mark-page__window-content">
                        <div className="new-student-mark-page-header">
                            Новая оценка
                        </div>
                        <div
                            className="new-student-mark-page-frame-cell"
                        >
                            {marksModel.studentToNewMark.lastname + ' ' + marksModel.studentToNewMark.firstname + ' ' + marksModel.studentToNewMark.fathername}
                        </div>
                        <div
                            className="new-student-mark-page-frame-cell-group"
                        >
                            {marksModel.studentToNewMark.group.name}
                        </div>
                        <CustomSelect
                            options={this.state.options}
                            isMulti={false}
                            placeholder={'Subject'}
                            isSubjectSelect={true}
                        />
                        <CustomSelect
                            options={marksOptions}
                            isMulti={false}
                            placeholder={'Group'}
                            isMarkSelect={true}
                        />
                        <input
                            className="createNewStudentMark"
                            type="submit"
                            value="Добавить"
                            name="add"
                            onClick={this.addMark}
                        />
                        <p
                            id="new-student-mark-page-warning"
                            className="new-student-mark-page-warning"
                        >
                            Заполните все поля
                        </p>
                    </div>
                </div>
            </div>
        </div>
    }

}

export default AddNewMark;