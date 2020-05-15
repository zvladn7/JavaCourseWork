import {groupModel} from "../../../model/GroupModel";
import {userModel} from "../../../model/UserModel";

export async function createGroup(data) {

    const response = await fetch('/api/groups', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + userModel.token
        }
    });

    groupModel.isPresent = false;

}