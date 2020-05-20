import {subjectModel} from "../../../model/SubjectModel";
import {userModel} from "../../../model/UserModel";

export async function removeSubject(subjectId) {

    const response = await fetch('/api/subjects/' +  subjectId, {
        method: "DELETE",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });
    userModel.dropOnTokenTimeoutIfExpired(response.status);

    if (response.status === 400) {
        userModel.isBadRequest = true;
        setTimeout(() => {
            userModel.isBadRequest = false;
        }, 1500)
    }

    subjectModel.isPresent = false;

}