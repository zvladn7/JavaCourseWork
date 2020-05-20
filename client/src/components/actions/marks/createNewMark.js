import {userModel} from "../../../model/UserModel";

export async function createNewMark(mark) {

    const response = await fetch('/api/marks', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(mark),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });
    userModel.dropOnTokenTimeoutIfExpired(response.status);

}