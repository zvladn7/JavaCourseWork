import React, { Component } from 'react';
import AddItem from "./AddItem";
import '../../css/subjects/list.css';
import ItemsList from "./ItemsList";
import {observer} from "mobx-react";

@observer
class ViewCrudPage extends Component {

    render() {

        return <div>
            <h1 className="department__-list-component-header">
                {this.props.header}
            </h1>
            <div className="department__list-component">
                <AddItem
                    createElement={this.props.createElement}
                    addInputPlaceholder={this.props.addInputPlaceholder}
                />
                <ItemsList
                    loadItems={this.props.loadItems}
                    items={this.props.items}
                    editElement={this.props.editElement}
                    removeElement={this.props.removeElement}
                    isItemsPresent={this.props.isItemsPresent}
                />
            </div>
        </div>
    }

}

export default ViewCrudPage;