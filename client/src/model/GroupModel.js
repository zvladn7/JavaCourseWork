import {observable} from 'mobx'

export class GroupModel {

    @observable
    groups = [];

    @observable
    isPresent = false;

}

export const groupModel = new GroupModel();