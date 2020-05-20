import {subjectModel} from "../../../model/SubjectModel";
import {userModel} from "../../../model/UserModel";
import {marksModel} from "../../../model/MarksModel";

export async function loadSubject() {

    const response = await fetch('/api/subjects', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });
    console.log(response.status);
    userModel.dropOnTokenTimeoutIfExpired(response.status);

    subjectModel.subjects = await response.json();


    subjectModel.isPresent = true;
    marksModel.isSubjectLoaded = true;
}