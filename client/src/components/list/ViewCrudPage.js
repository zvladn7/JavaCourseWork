import React, { Component } from 'react';
import AddItem from "./AddItem";
import '../../css/list.css';
import ItemsList from "./ItemsList";
import {observer} from "mobx-react";
import {menubarModel} from "../../model/MenubarModel";
import {userModel} from "../../model/UserModel";

@observer
class ViewCrudPage extends Component {

    render() {
        if (menubarModel.isSelectedMenubarItemChanged) {
            menubarModel.redirect(menubarModel.selectedMenubarItem);
        }

        return <div>
            <h1 className="department__-list-component-header">
                {this.props.header}
            </h1>
            <div className="department__list-component">

                {userModel.person !== null && userModel.person.type === 'T'
                    ? <AddItem
                        createElement={this.props.createElement}
                        addInputPlaceholder={this.props.addInputPlaceholder}
                    />
                    : null
                }
                <ItemsList
                    loadItems={this.props.loadItems}
                    items={this.props.items}
                    editElement={this.props.editElement}
                    removeElement={this.props.removeElement}
                    isItemsPresent={this.props.isItemsPresent}
                    type={this.props.type}
                />
            </div>
        </div>
    }

}

export default ViewCrudPage;