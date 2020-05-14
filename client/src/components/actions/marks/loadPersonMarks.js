import {toJS} from "mobx";
import {marksModel} from "../../../model/MarksModel";

export async function loadStudents(personId) {

    const response = await fetch('/api/marks/student/' + personId, {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    marksModel.marks = await response.json();

    marksModel.isPresent = true;
    console.log(toJS(marksModel.marks));
}