import React, { Component } from 'react';
import {observer} from "mobx-react";
import {toJS} from "mobx";
import GroupsListItem from "./GroupsListItem";
import SubjectListItem from "./SubjectListItem";

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
                this.props.items.map((item) => {
                    return this.props.type === 'subjects'
                        ?  <SubjectListItem
                            key={item.id}
                            item={item}
                            name={item.name}
                            editElement={this.props.editElement}
                            removeElement={this.props.removeElement}
                        />
                        : <GroupsListItem
                            key={item.id}
                            item={item}
                            name={item.name}
                            editElement={this.props.editElement}
                            removeElement={this.props.removeElement}
                        />
                })
            }
        </div>
    }

}

export default ItemsList;