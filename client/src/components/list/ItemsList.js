import React, { Component } from 'react';
import {observer} from "mobx-react";
import ListItem from "./ListItem";

@observer
class ItemsList extends Component {

    render() {
        if (!this.props.isItemsPresent) {
            this.props.loadItems();
        }

        return <div className="department__list">
            {
                this.props.items.map((item) => {
                    return <ListItem
                        key={item.id}
                        item={item}
                        editElement={this.props.editElement}
                        removeElement={this.props.removeElement}
                    />
                })
            }
        </div>
    }

}

export default ItemsList;