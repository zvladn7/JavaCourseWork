import {groupModel} from "../../../model/GroupModel";
import {studentsModel} from "../../../model/StudentsModel";

export async function loadGroups() {
    const response = await fetch('/api/groups', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
        }
    });

    groupModel.groups = [];
    groupModel.groups = await response.json();

    groupModel.isPresent = true;
    studentsModel.isGroupsLoaded = true;
}