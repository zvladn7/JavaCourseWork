import React, { Component } from 'react';
import AddSubject from "./AddSubject";
import {subjectModel} from "../../model/SubjectModel";
import {observer} from "mobx-react";
import {loadSubject} from "../actions/subjects/loadSubjects";
import {SubjectListItem} from "./SubjectListItem";

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
                    return <SubjectListItem key={index} subject={subject}/>
                })
            }
        </div>
    }

}

export default SubjectsList;