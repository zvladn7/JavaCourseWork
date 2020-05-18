import {observable} from "mobx";

export class UserModel {

    @observable
    token = null;

    @observable
    person = null;

    @observable
    isPresent = false;
}

export const userModel = new UserModel();