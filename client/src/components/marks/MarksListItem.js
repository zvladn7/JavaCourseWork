import React, { Component } from 'react';
import distinctImage from "../../css/image/cup.svg"


class MarksListItem extends Component {

    render() {
        return <div className="marks-list-item">
            <div className="marks-list-item__discipline">
                {this.props.mark.subject.name}
            </div>
            <div className="marks-list-item__teacher">
                {this.props.mark.teacher.last_name + ' ' +
                 this.props.mark.teacher.first_name + ' ' +
                 this.props.mark.teacher.father_name}
            </div>
            <div className="marks-list-item__distinct">
                {   this.props.mark.value === 5
                    ? <img className="marks-list-item__distinct-image" src={distinctImage}/>
                    : null
                }
            </div>
            <div className="marks-list-item__value">
                {this.props.mark.value}
            </div>
        </div>
    }

}

export default MarksListItem;