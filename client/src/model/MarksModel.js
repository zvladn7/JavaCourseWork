import {action, observable} from 'mobx'

export class MarksModel {

    @observable
    marks = [];

    @observable
    isPresent = false;

    @observable
    currentPerson = null;

    @observable
    isNewMarkModalOpen = false;

    @observable
    isSubjectLoaded = false; //for new mark modal window

    @observable
    studentToNewMark = null;

    @action
    dropSubjectLoadedFlag() {
        this.isSubjectLoaded = false;
    }

}

export const marksModel = new MarksModel();