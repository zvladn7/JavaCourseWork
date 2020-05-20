import {userModel} from "../../../model/UserModel";
import {studentsModel} from "../../../model/StudentsModel";

export async function addStudent(student) {

    const response = await fetch('/api/people', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(student),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });
    userModel.dropOnTokenTimeoutIfExpired(response.status);

    studentsModel.isPresent = false;


}