import {subjectModel} from "../../../model/SubjectModel";

export async function editSubjectName(subject) {

    const response = await fetch('/api/subjects/' +  subject.id, {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(subject),
        headers: {
            "Content-Type": "application/json"
        }
    });

    subjectModel.isPresent = false;
}