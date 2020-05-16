import React, { Component } from 'react';
import {observer} from "mobx-react";
import '../../css/listNotEditableItem.css';

@observer
class ListNotEditableItem extends Component {
    render() {
        return <div className="list-item_not-editable">
            <div className="list-item_not-editable-number">
                {this.props.number}
            </div>
            <div className="list-item_not-editable-name">
                {this.props.name}
            </div>
        </div>
    }

}

export default ListNotEditableItem;