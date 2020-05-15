import {observable} from "mobx";

export class UserModel {

    @observable
    token = null;

}

export const userModel = new UserModel();