import React from 'react';
import Select from 'react-select';
import {observer} from "mobx-react";

@observer
class CustomSelect extends React.Component {

    customStyles = {
        container: () => ({
            minWidth    : '100%',
            position    : "relative",
            margin      : '0 auto'
        }),
        placeholder: () => ({
            fontSize    : '18px',
            textAlign   : 'center',
            fontFamily  : '\'Open Sans\', sans-serif',
            fontStyle   : 'italic'
        }),
        dropdownIndicator: () => ({
            ":hover"    : {
                color   : "#0867d4"
            }
        }),
        option: (provided, state) => ({
            ...provided,
            color       : '#000000',
            backgroundColor: state.isSelected ? '#e4e4e4' : '#FFFFFF',
            ":hover"    : {
                backgroundColor: "#F2F2F2"
            }
        }),
    };

    constructor(props) {
        super(props);


        this.state = {
            selectedOption: []
        }

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                name="form"
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.options}
                styles={this.customStyles}
                isMulti={true}
                placeholder={this.props.placeholder}
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: "#F2F2F2",
                    },
                })}
            />
        );
    }
}

export default CustomSelect;