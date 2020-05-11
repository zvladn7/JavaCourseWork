import React, { Component } from 'react';
import {removeSubject} from "../actions/subjects/removeSubject";
import {editSubjectName} from "../actions/subjects/editSubjectName";
import {observer} from "mobx-react";

@observer
class SubjectListItem extends Component {

    state = {
        name: this.props.subject.name,
        isEditEnable: false,
        editSaveButtonText: 'edit',
    }

    onDelete = () => {
        removeSubject(this.props.subject.id)
    };

    onSubjectNameChange = event => {
        if (this.state.isEditEnable) {
            this.setState({
                name: event.target.value
            })
        }
    }

    enableEditOrSave = () => {
        if (this.state.editSaveButtonText === 'edit') {
            this.setState({
                isEditEnable: true,
                editSaveButtonText: 'save'
            });
        } else {
            this.setState({
                isEditEnable: true,
                editSaveButtonText: 'edit'
            });
            editSubjectName({
                id: this.props.subject.id,
                name: this.state.name
            });
        }
    }

    render() {

        return <div className="subject-list-item">
            <input
                className="subject-list-item__input"
                value={ this.state.name }
                onChange={this.onSubjectNameChange}
            />
            <button
                className="subject-list-item__edit-save-button"
                onClick={this.enableEditOrSave}
            >
                {this.state.editSaveButtonText}
            </button>
            <button
                className="subject-list-item__delete-button"
                onClick={ this.onDelete }
            >
                ×
            </button>
        </div>
    }

}

export default SubjectListItem;