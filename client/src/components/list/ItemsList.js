import React, { Component } from 'react';
import {observer} from "mobx-react";
import {toJS} from "mobx";
import GroupsListItem from "./editable/GroupsListItem";
import SubjectListItem from "./editable/SubjectListItem";
import {userModel} from "../../model/UserModel";
import ListNotEditableItem from "./ListNotEditableItem";

@observer
class ItemsList extends Component {

    componentDidMount() {
        this.props.loadItems();
    }

    render() {
        if (!this.props.isItemsPresent) {
            this.props.loadItems();
        }

        console.log(toJS(this.props.items))

        return <div className="department__list">
            {
                this.props.items.map((item, index) => {
                    return this.props.type === 'subjects'
                        ?  userModel.person !== null && userModel.person.type === 'A'
                            ? <SubjectListItem
                                    key={item.id}
                                    item={item}
                                    name={item.name}
                                    editElement={this.props.editElement}
                                    removeElement={this.props.removeElement}
                            />
                            : <ListNotEditableItem
                                key={item.key}
                                number={index + 1}
                                name={item.name}
                            />
                        : userModel.person !== null && userModel.person.type === 'A'
                            ? <GroupsListItem
                                    key={item.id}
                                    item={item}
                                    name={item.name}
                                    editElement={this.props.editElement}
                                    removeElement={this.props.removeElement}
                            />
                            : <ListNotEditableItem
                                key={item.key}
                                number={index + 1}
                                name={item.name}
                            />
                })
            }
        </div>
    }

}

export default ItemsList;