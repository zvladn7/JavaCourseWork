import {observable} from 'mobx'

export class SubjectModel {

    @observable
    subjects = [];

    @observable
    isPresent = false;

    @observable
    options = [];

    @observable
    selectedSubject = null;

}

export const subjectModel = new SubjectModel();