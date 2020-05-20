import {action, observable} from 'mobx'

export class StudentsModel {

    @observable
    students = [];

    @observable
    filteredStudents = [];

    @observable
    isPresent = false;

    @observable
    isGroupsLoaded = false;

    @observable
    isFilterRequired = false;

    @observable
    selectedGroups = [];

    @observable
    isModalWindowOpen = false;

    @observable
    studentToEdit = null;

    @action
    dropGroupLoadedFlag() {
        this.isGroupsLoaded = false;
    }

    @action
    filterStudents()  {
        if (this.selectedGroups.length === 0) {
            this.filteredStudents = this.students;
        } else {
            this.filteredStudents = this.students.filter(student => {
                let isFilteredStudent = false;
                this.selectedGroups.forEach(group => {
                    if (student.group !== null) {
                        isFilteredStudent = (student.group.name === group) || isFilteredStudent;
                    }
                });
                return isFilteredStudent;
            })
        }
        this.isFilterRequired = false;
    }

}

export const studentsModel = new StudentsModel();