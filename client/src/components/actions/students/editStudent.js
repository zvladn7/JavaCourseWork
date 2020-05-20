import {userModel} from "../../../model/UserModel";
import {studentsModel} from "../../../model/StudentsModel";

export async function editStudent(student) {

    const response = await fetch('/api/people/' +  student.id, {
        method: "PUT",
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