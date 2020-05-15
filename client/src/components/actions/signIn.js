import {userModel} from "../../model/UserModel";

export async function signIn(authRequest) {

    const response = await fetch('/api/auth/signin', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(authRequest),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    userModel.token = data.token;

}