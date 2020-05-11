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
                    type="text"
                    placeholder="Add new todo"
                    value={ this.state.todoText }
                    onChange={ this.onSubjectNameChange }
                />

                <button
                    type="submit"
                    aria-label="Add new todo"
                >
                    Добавить предмет
                </button>

            </form>
        </div>
    }

}

export default AddSubject;