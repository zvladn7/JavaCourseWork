import React, { Component } from 'react';
import {subjectModel} from "../../model/SubjectModel";
import {observer} from "mobx-react";
import {loadSubject} from "../actions/subjects/loadSubjects";
import ListItem from "./ListItem";
import {toJS} from "mobx";

@observer
class ItemsList extends Component {

    render() {
        if (!subjectModel.isPresent) {
            loadSubject();
        }
        console.log(toJS(subjectModel.subjects));

        return <div className="department__list">
            {
                this.props.items.map((subject) => {
                    return <ListItem key={subject.id} subject={subject}/>
                })
            }
        </div>
    }

}

export default ItemsList;