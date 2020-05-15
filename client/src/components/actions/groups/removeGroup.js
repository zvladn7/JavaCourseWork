import {groupModel} from "../../../model/GroupModel";
import {userModel} from "../../../model/UserModel";

export async function removeGroup(groupId) {

    const response = await fetch('/api/groups/' +  groupId, {
        method: "DELETE",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });

    groupModel.isPresent = false;

}