import {groupModel} from "../../../model/GroupModel";

export async function createGroup(data) {

    const response = await fetch('/api/groups', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    groupModel.isPresent = false;

}