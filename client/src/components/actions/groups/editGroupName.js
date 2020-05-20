import {groupModel} from "../../../model/GroupModel";
import {userModel} from "../../../model/UserModel";

export async function editGroupName(group) {

    const response = await fetch('/api/groups/' +  group.id, {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(group),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });
    userModel.dropOnTokenTimeoutIfExpired(response.status);

    groupModel.isPresent = false;
}