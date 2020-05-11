import {subjectModel} from "../../../model/SubjectModel";

export async function removeSubject(subjectId) {

    const response = await fetch('/api/subjects/' +  subjectId, {
        method: "DELETE",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    subjectModel.isPresent = false;

}