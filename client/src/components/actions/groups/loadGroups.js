import {groupModel} from "../../../model/GroupModel";

export async function loadGroups() {

    const response = await fetch('/api/groups', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    groupModel.groups = await response.json();

    groupModel.isPresent = true;
}