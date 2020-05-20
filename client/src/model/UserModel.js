import {action, observable} from "mobx";

export class UserModel {

    @observable
    token = null;

    @observable
    person = null;

    @observable
    isPresent = false;

    @observable
    isRegistrationSucceed = true;

    @observable
    isRedirect = false;

    @observable
    isBadRequest = false;

    @action
    dropOnTokenTimeoutIfExpired(status) {
        if (status === 401) {
            this.token = null;
            this.person = null;
            localStorage.clear();
        }
    }
}

export const userModel = new UserModel();