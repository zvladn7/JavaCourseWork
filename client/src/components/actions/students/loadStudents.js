import {studentsModel} from "../../../model/StudentsModel";
import {userModel} from "../../../model/UserModel";
import {toJS} from "mobx";

export async function loadStudents() {

    const response = await fetch('/api/people/students', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });
    studentsModel.students = await response.json();
    studentsModel.filterStudents();
    userModel.dropOnTokenTimeoutIfExpired(response.status);

    console.log(toJS(studentsModel.students));

    studentsModel.isPresent = true;
}