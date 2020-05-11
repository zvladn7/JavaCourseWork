import React, { Component } from 'react';
import AddSubject from "./AddSubject";
import '../../css/subjects/subjects.css';
import SubjectsList from "./SubjectsList";
import {observer} from "mobx-react";

@observer
class Subjects extends Component {

    render() {

        return <div>
            <h1 className="department__subjects-list-component-header">
                Предметы
            </h1>
            <div className="department__subjects-list-component">
                <AddSubject/>
                <SubjectsList/>
            </div>
        </div>
    }

}

export default Subjects;