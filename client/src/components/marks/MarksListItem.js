import React, { Component } from 'react';
import distinctImage from "../../css/image/cup.svg"
import {userModel} from "../../model/UserModel";
import {marksModel} from "../../model/MarksModel";


class MarksListItem extends Component {

    openChangeMarkModalWindow = () => {
        marksModel.selectedSubject = this.props.mark.subject;
        marksModel.selectedValue = this.props.mark.value;
        marksModel.isEditMark = true;
        marksModel.isNewMarkModalOpen = true;
        marksModel.studentToNewMark = this.props.mark.student;
    }

    render() {
        return <div className="marks-list-item">
            <div className="marks-list-item__discipline">
                {this.props.mark.subject.name}
            </div>
            <div className="marks-list-item__teacher">
                {this.props.mark.teacher.lastname + ' ' +
                 this.props.mark.teacher.firstname.substr(0, 1) + '. ' +
                 this.props.mark.teacher.fathername.substr(0, 1) + '.'}
            </div>
            <div className="marks-list-item__distinct">
                {   this.props.mark.value === 5
                    ? <img className="marks-list-item__distinct-image" src={distinctImage} alt="#"/>
                    : null
                }
            </div>
            <div className="marks-list-item__value">
                {this.props.mark.value}
            </div>
            { userModel.person !== null
                && userModel.person.type === 'T'
                && userModel.person.id === this.props.mark.teacher.id
                ? <div
                    className='marks-list-item__alter'
                >
                    <button
                        className="marks-list-item__alter-button"
                        onClick={this.openChangeMarkModalWindow}
                    >
                        Изменить
                    </button>
                </div>
                : null
            }
        </div>
    }

}

export default MarksListItem;