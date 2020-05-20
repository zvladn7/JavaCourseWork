import {userModel} from "../../../model/UserModel";
import {marksModel} from "../../../model/MarksModel";

export async function updateMark(mark) {

    const response = await fetch('/api/marks/' +  mark.id, {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(mark),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });

    marksModel.isPresent = false;
}