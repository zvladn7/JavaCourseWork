import {subjectModel} from "../../../model/SubjectModel";

export async function loadSubject() {

    const response = await fetch('/api/subjects', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    subjectModel.subjects = await response.json();

    subjectModel.isPresent = true;
}