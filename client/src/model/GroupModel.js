import {observable} from 'mobx'

export class GroupModel {

    @observable
    groups = [];

    @observable
    isPresent = false;

    @observable
    options = [];

}

export const groupModel = new GroupModel();