import {action, observable} from 'mobx'
import React from "react";

export class MenubarModel {

    /*
    * values:
    * 1 - subject selected
    * 2 - groups selected
    * 3 - marks selected
    * 4 - students selected
    * */
    @observable
    selectedMenubarItem = null;

    @observable
    isSelectedMenubarItemChanged = false;

    @observable
    selectedPage = null;

    @action
    redirect = (value) => {
        switch (value) {
            case '1':
                this.selectedPage = 'subjects'
                break;
            case '2':
                this.selectedPage = 'groups'
                break;
            case '3':
                this.selectedPage = 'marks'
                break;
            case '4':
                this.selectedPage = 'students'
                break;
            default:
        }
        localStorage.setItem("selectedMenubarItem",JSON.stringify(this.selectedMenubarItem));
        localStorage.setItem("selectedPage",JSON.stringify(this.selectedPage));

        this.isSelectedMenubarItemChanged = false;
    };

}

export const menubarModel = new MenubarModel();