import {observable} from 'mobx'

export class StudentsModel {

    @observable
    students = [];

    @observable
    isPresent = false;

}

export const studentsModel = new StudentsModel();