import {groupModel} from "../../../model/GroupModel";

export async function removeGroup(groupId) {

    const response = await fetch('/api/groups/' +  groupId, {
        method: "DELETE",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    groupModel.isPresent = false;

}