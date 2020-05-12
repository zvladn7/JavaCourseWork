import React, { Component } from 'react';
import '../css/menubar.css'
import {menubarModel} from "../model/MenubarModel";
import {observer} from "mobx-react";

@observer
class MenuBar extends Component {


    onMenuBarItemClicked = event => {
        menubarModel.selectedMenubarItem = event.target.id;
        menubarModel.isSelectedMenubarItemChanged = true;
    }

    render() {

        return (
            <div className="menubar">
                <button
                    id="1"
                    className={menubarModel.selectedMenubarItem === '1'
                                ? "menubar-item_selected"
                                : "menubar-item"}
                    onClick={this.onMenuBarItemClicked}
                >
                    Subjects
                </button>
                <button
                    id="2"
                    className={menubarModel.selectedMenubarItem === '2'
                        ? "menubar-item_selected"
                        : "menubar-item"}
                    onClick={this.onMenuBarItemClicked}
                >
                    Groups
                </button>
                <button
                    id="3"
                    className={menubarModel.selectedMenubarItem === '3'
                        ? "menubar-item_selected"
                        : "menubar-item"}
                    onClick={this.onMenuBarItemClicked}
                >
                    Marks
                </button>
                <button
                    id="4"
                    className={menubarModel.selectedMenubarItem === '4'
                        ? "menubar-item_selected"
                        : "menubar-item"}
                    onClick={this.onMenuBarItemClicked}
                >
                    Students
                </button>
            </div>
        );
    }

}


export default MenuBar;