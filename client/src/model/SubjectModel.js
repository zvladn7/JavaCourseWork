import {observable} from 'mobx'

export class SubjectModel {

    @observable
    subjects = [];

    @observable
    isPresent = false;

}

export const subjectModel = new SubjectModel();