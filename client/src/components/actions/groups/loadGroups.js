import {groupModel} from "../../../model/GroupModel";
import {studentsModel} from "../../../model/StudentsModel";
import {userModel} from "../../../model/UserModel";

export async function loadGroups() {
    console.log('---------------------');
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