import {groupModel} from "../../../model/GroupModel";
import {studentsModel} from "../../../model/StudentsModel";
import {userModel} from "../../../model/UserModel";

export async function loadGroups() {
    const response = await fetch('/api/groups', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
        }
    });
    userModel.dropOnTokenTimeoutIfExpired(response.status);

    groupModel.groups = [];
    groupModel.groups = await response.json();

    groupModel.isPresent = true;
    studentsModel.isGroupsLoaded = true;
}