import {observable} from "mobx";

export class UserModel {

    @observable
    token = null;

    @observable
    person = null;

}

export const userModel = new UserModel();