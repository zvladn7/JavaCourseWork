import React, { Component } from 'react';
import {observer} from "mobx-react";

@observer
class StudentListItem extends Component {

    render() {
        return <div className="student-list-item">
            <div className="student-list-item__number">
                {this.props.number + 1}
            </div>
            <div className="student-list-item__info">
                <div className="student-list-item__info-group">
                    {this.props.group}
                </div>
                <div className="student-list-item__info-fio">
                    {this.props.studentFullName}
                </div>
            </div>
        </div>
    }

}

export default StudentListItem;