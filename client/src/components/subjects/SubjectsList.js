import React, { Component } from 'react';
import AddSubject from "./AddSubject";
import {subjectModel} from "../../model/SubjectModel";
import {observer} from "mobx-react";
import {loadSubject} from "../actions/subjects/loadSubjects";

@observer
class SubjectsList extends Component {

    render() {
        if (!subjectModel.isPresent) {
            loadSubject();
        }

        return <div className="department__subjects-list">
            <AddSubject/>
            {
                subjectModel.subjects.map((subject, index) => {
                    return <div key={index}>{subject.name}</div>
                })
            }
        </div>
    }

}

export default SubjectsList;