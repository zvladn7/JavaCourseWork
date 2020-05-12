import {action, observable} from 'mobx'
import {Redirect} from 'react-router-dom';
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
    selectedMenubarItem = '1';

    @observable
    isSelectedMenubarItemChanged = false;

    @observable
    selectedPage = 'subjects';

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
        this.isSelectedMenubarItemChanged = false;
    };

}

export const menubarModel = new MenubarModel();