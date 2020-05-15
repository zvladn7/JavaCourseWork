import {subjectModel} from "../../../model/SubjectModel";
import {userModel} from "../../../model/UserModel";

export async function loadSubject() {

    const response = await fetch('/api/subjects', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });
    // console.log('1',subjectModel.subjects);

    subjectModel.subjects = await response.json();
    // console.log('2',subjectModel.subjects);


    subjectModel.isPresent = true;
}