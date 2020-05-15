import {subjectModel} from "../../../model/SubjectModel";
import {userModel} from "../../../model/UserModel";

export async function createSubject(data) {

    const response = await fetch('/api/subjects', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });

    subjectModel.isPresent = false;

}