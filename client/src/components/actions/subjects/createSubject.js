import {subjectModel} from "../../../model/SubjectModel";

export async function createSubject(data) {

    const response = await fetch('/api/subjects', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    subjectModel.isPresent = false;

}