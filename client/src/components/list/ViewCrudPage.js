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
            <p className="department__list-warning-header">
                {userModel.isBadRequest ? "Невозможно удалить, так как " +
                    (this.props.type === "groups" ? "в группе есть студенты!" : "по предмету стоят оценки!")
                    : null
                }
            </p>
            <div className="department__list-component">

                {userModel.person !== null && userModel.person.type === 'A'
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