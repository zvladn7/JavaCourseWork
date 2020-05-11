import React, { Component } from 'react';
import AddSubject from "./AddSubject";

class SubjectsList extends Component {

    render() {

        return <div className="department__subjects-list">
            <AddSubject/>
            <SubjectsList/>
        </div>
    }

}

export default SubjectsList;