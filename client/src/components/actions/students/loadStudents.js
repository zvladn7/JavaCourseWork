import {studentsModel} from "../../../model/StudentsModel";
import {toJS} from "mobx";

export async function loadStudents() {

    const response = await fetch('/api/people/students', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    studentsModel.students = await response.json();
    studentsModel.filterStudents();

    studentsModel.isPresent = true;
}