import {groupModel} from "../../../model/GroupModel";
import {studentsModel} from "../../../model/StudentsModel";
import {toJS} from "mobx";

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
    studentsModel.isGroupsLoaded = true;
    console.log(response.status);
    console.log(toJS(groupModel.groups));
}