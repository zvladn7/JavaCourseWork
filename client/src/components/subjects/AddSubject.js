import React, { Component } from 'react';
import {createSubject} from "../actions/subjects/createSubject";

class AddSubject extends Component {

    state = {
        subjectName: '',
    }

    onSubjectNameChange = event => {
        this.setState({
            subjectName: event.target.value
        });
    }

    onSubmit = event => {
        event.preventDefault();

        const currentSubjectName = this.state.subjectName;

        this.setState({
            subjectName: '',
        });

        createSubject({
            name: currentSubjectName,
        })
    }

    render() {
        return <div className="subject-add">
            <form
                method="post"
                action="/"
                autoComplete="off"
                onSubmit={ this.onSubmit }
            >

                <input
                    className="subject-add-input"
                    type="text"
                    placeholder="Новый предмет"
                    value={ this.state.subjectName }
                    onChange={ this.onSubjectNameChange }
                />

                <button
                    className="subject-add-button"
                    type="submit"
                >
                    Добавить
                </button>

            </form>
        </div>
    }

}

export default AddSubject;