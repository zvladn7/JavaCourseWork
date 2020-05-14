import {observable} from 'mobx'

export class MarksModel {

    @observable
    marks = [];

    @observable
    isPresent = false;

    @observable
    currentPerson = null;

}

export const marksModel = new MarksModel();