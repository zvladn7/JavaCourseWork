import {observable} from "mobx";

export class UserModel {

    @observable
    token = '';

}

export const userModel = new UserModel();