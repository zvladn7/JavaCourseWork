import React, { Component } from 'react';
import {marksModel} from "../../model/MarksModel";
import MarksListItem from "./MarksListItem";
import distinctImage from "../../css/image/cup.svg"
import {loadPersonMarks} from "../actions/marks/loadPersonMarks";
import {observer} from "mobx-react";
import {userModel} from "../../model/UserModel";

@observer
class MarksList extends Component {

    constructor(props) {
        super(props);

        marksModel.isPresent = false;
    }


    render() {

        if (!marksModel.isPresent && marksModel.currentPerson !== null) {
            loadPersonMarks(marksModel.currentPerson.id);
        }

        return <div className="marks-list">
            <div className="marks-list-item">
                <div
                    className="marks-list-item__discipline"
                    style={{backgroundColor: "#E6E6E6"}}
                >
                    Дисциплина
                </div>
                <div
                    className="marks-list-item__teacher"
                    style={{backgroundColor: "#E6E6E6"}}
                >
                    Преподаватель
                </div>
                <div
                    className="marks-list-item__distinct"
                    style={{backgroundColor: "#E6E6E6"}}
                >
                    <img
                        className="marks-list-item__distinct-image"
                        src={distinctImage}
                        alt={''}
                    />
                </div>
                <div
                    className="marks-list-item__value"
                    style={{backgroundColor: "#E6E6E6"}}
                >
                    Результат
                </div>
                { userModel.person !== null
                && userModel.person.type === 'T'
                    ? <div
                        className='marks-list-item__alter'
                        style={{backgroundColor: "#E6E6E6"}}
                    >
                        Изменить
                    </div>
                    : null
                }
            </div>
            {
                marksModel.marks.map(mark => {
                    return <MarksListItem
                        styles={{padding: 0, margin: 0}}
                        key={mark.id}
                        mark={mark}
                    />
                })
            }
        </div>
    }

}

export default MarksList;