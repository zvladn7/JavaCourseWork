import React, { Component } from 'react';
import {subjectModel} from "../../model/SubjectModel";
import {observer} from "mobx-react";
import {loadSubject} from "../actions/subjects/loadSubjects";
import SubjectListItem from "./SubjectListItem";
import {toJS} from "mobx";

@observer
class SubjectsList extends Component {

    render() {
        if (!subjectModel.isPresent) {
            loadSubject();
        }
        console.log(toJS(subjectModel.subjects));

        return <div className="department__subjects-list">
            {
                subjectModel.subjects.map((subject) => {
                    return <SubjectListItem key={subject.id} subject={subject}/>
                })
            }
        </div>
    }

}

export default SubjectsList;