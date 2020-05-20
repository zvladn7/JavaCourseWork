import React, { Component } from 'react';
import {observer} from "mobx-react";

@observer
class ListItem extends Component {

    state = {
        name: this.props.name,
        isEditEnable: false,
        editSaveButtonText: 'edit',
        isInvalidEditText: false,
        isToastViewed: false,
    }

    onDelete = () => {
        this.props.removeElement(this.props.item.id)
    };

    onSubjectNameChange = event => {
        if (this.state.isEditEnable) {
            this.setState({
                name: event.target.value,
                isInvalidEditText: false
            });
        }
    }

    enableEditOrSave = () => {
        if (this.state.editSaveButtonText === 'edit') {
            this.setState({
                isEditEnable: true,
                editSaveButtonText: 'save'
            });
        } else {
            if (this.state.name.length !== 0) {
                this.setState({
                    isEditEnable: true,
                    editSaveButtonText: 'edit'
                });
                this.props.editElement({
                    id: this.props.item.id,
                    name: this.state.name
                });
            } else {
                this.setState({
                    isInvalidEditText: true
                });
                setTimeout(() => {
                    this.setState({
                        isToastViewed: true
                    });
                    setTimeout(() => {
                        this.setState({
                            isToastViewed: false
                        });
                    }, 700);
                }, 50)
            }
        }
    }

    render() {

        return <div className="list-item">
            <input
                id={"list-item__input" + this.props.item.id}
                className="list-item__input"
                style={{
                    borderColor: this.state.isInvalidEditText ? "red" : "#E6E6E6",
                    color: this.state.isToastViewed ? "red" : "black"
                }}
                value={ this.state.isToastViewed ? 'Поле не должено быть пустым!' : this.state.name }
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