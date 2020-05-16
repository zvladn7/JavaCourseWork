import React, { Component } from 'react';
import {observer} from "mobx-react";
import ListItem from "./ListItem";

@observer
class GroupsListItem extends Component {

    render() {
        return <ListItem
            item={this.props.item}
            name={this.props.name}
            editElement={this.props.editElement}
            removeElement={this.props.removeElement}
        />
    }

}

export default GroupsListItem;