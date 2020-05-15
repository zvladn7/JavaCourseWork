import React from 'react';
import Select from 'react-select';
import {observer} from "mobx-react";
import {studentsModel} from "../model/StudentsModel";

@observer
class CustomSelect extends React.Component {

    customStyles = {
        container: () => ({
            minWidth    : this.props.isGroupSelect ? "0" : '100%',
            width       : this.props.isGroupSelect ? "315px" : "-1",
            position    : "relative",
            margin      : this.props.isGroupSelect ? '2% 2% 2% 12%' : "0 auto",
            color       : "gray",
            zIndex      : 100
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
            selectedOption: this.props.isGroupSelect ? null : []
        }

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        if (this.props.isStudentSelect) {
            studentsModel.isFilterRequired = true;
            if (selectedOption !== null) {
                studentsModel.selectedGroups = selectedOption.map(item => item.value);
            } else {
                studentsModel.selectedGroups = [];
            }
        }

        if (this.props.isGroupSelect) {
            studentsModel.selectedGroups = { id: selectedOption.id };
        }
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
                isMulti={this.props.isMulti}
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