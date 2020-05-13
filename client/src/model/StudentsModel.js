import {action, observable} from 'mobx'

export class StudentsModel {

    @observable
    students = [];

    @observable
    isPresent = false;

    @observable
    isGroupsLoaded = false;

    @observable
    selectedGroups = [];

    @action
    dropGroupLoadedFlag() {
        this.isGroupsLoaded = false;
    }

}

export const studentsModel = new StudentsModel();