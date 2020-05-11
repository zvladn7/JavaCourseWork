import React, { Component } from 'react';

class AddItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }

    }

    onSubjectNameChange = event => {
        this.setState({
            name: event.target.value
        });
    }

    onSubmit = event => {
        event.preventDefault();

        const currentName = this.state.name;

        this.setState({
            name: '',
        });

        this.props.createElement({
            name: currentName,
        })
    }

    render() {
        return <div className="list-item-add">
            <form
                method="post"
                action="/"
                autoComplete="off"
                onSubmit={ this.onSubmit }
            >

                <input
                    className="list-item-add-input"
                    type="text"
                    placeholder={this.props.addInputPlaceholder}
                    value={ this.state.name }
                    onChange={ this.onSubjectNameChange }
                />

                <button
                    className="list-item-add-button"
                    type="submit"
                >
                    Add
                </button>

            </form>
        </div>
    }

}

export default AddItem;