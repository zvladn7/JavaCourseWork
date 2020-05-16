import {toJS} from "mobx";
import {marksModel} from "../../../model/MarksModel";
import {userModel} from "../../../model/UserModel";

export async function loadPersonMarks(personId) {

    const response = await fetch('/api/marks/student/' + personId, {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });

    if (response.status === 404) {
        marksModel.marks = [];
    } else if (response.status === 200) {
        marksModel.marks = await response.json();
    }

    marksModel.isPresent = true;
    console.log(toJS(marksModel.marks));
}