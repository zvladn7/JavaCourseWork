import {groupModel} from "../../../model/GroupModel";

export async function editGroupName(group) {

    const response = await fetch('/api/groups/' +  group.id, {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(group),
        headers: {
            "Content-Type": "application/json"
        }
    });

    groupModel.isPresent = false;
}