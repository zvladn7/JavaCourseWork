import React, { Component } from 'react';
import '../../css/addNewMark.css';
import CustomSelect from "../CustomSelect";
import {studentsModel} from "../../model/StudentsModel";
import {observer} from "mobx-react";
import {addStudent} from "../actions/students/addStudent";
import {editStudent} from "../actions/students/editStudent";
import {subjectModel} from "../../model/SubjectModel";
import {loadSubject} from "../actions/subjects/loadSubjects";
import {marksModel} from "../../model/MarksModel";

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
        if (studentsModel.studentToEdit === null) {
            addStudent({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                father_name: this.state.father_name,
                group: studentsModel.selectedGroups,
                type: 'S'
            });
        } else {
            editStudent({
                id: studentsModel.studentToEdit.id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                father_name: this.state.father_name,
                group: studentsModel.selectedGroups,
                type: 'S'
            });
        }
        studentsModel.selectedGroups = [];
        studentsModel.isModalWindowOpen = false;
        studentsModel.studentToEdit = null;
    }

    render() {

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
                            {marksModel.studentToNewMark.last_name + ' ' + marksModel.studentToNewMark.first_name + ' ' + marksModel.studentToNewMark.father_name}
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
                            // onClick={this.addMark}
                        />
                    </div>
                </div>
            </div>
        </div>
    }

}

export default AddNewMark;