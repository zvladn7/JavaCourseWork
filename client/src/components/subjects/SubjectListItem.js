import React, { Component } from 'react';
import {removeSubject} from "../actions/subjects/removeSubject";


export class SubjectListItem extends Component {

    onDelete = () => {
        removeSubject(this.props.subject.id)
    };

    render() {

        return <div className="subject-list-item">
            <input
                className="subject-list-item__input"
                defaultValue={ this.props.subject.name }
            />
            <button
                className="subject-list-item__delete-button"
                onClick={ this.onDelete }
            >×</button>
        </div>
    }

}