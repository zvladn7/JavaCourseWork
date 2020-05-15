import {subjectModel} from "../../../model/SubjectModel";
import {userModel} from "../../../model/UserModel";

export async function editSubjectName(subject) {

    const response = await fetch('/api/subjects/' +  subject.id, {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(subject),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });

    subjectModel.isPresent = false;
}