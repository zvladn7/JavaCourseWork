import React, { Component } from 'react';
import {observer} from "mobx-react";

@observer
class ListItem extends Component {

    state = {
        name: this.props.item.name,
        isEditEnable: false,
        editSaveButtonText: 'edit',
    }

    onDelete = () => {
        this.props.removeElement(this.props.item.id)
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
            this.props.editElement({
                id: this.props.item.id,
                name: this.state.name
            });
        }
    }

    render() {

        return <div className="list-item">
            <input
                className="list-item__input"
                value={ this.state.name }
                onChange={this.onSubjectNameChange}
            />
            <button
                className="list-item__edit-save-button"
                onClick={this.enableEditOrSave}
            >
                {this.state.editSaveButtonText}
            </button>
            <button
                className="list-item__delete-button"
                onClick={ this.onDelete }
            >
                ×
            </button>
        </div>
    }

}

export default ListItem;