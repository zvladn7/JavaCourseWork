import {userModel} from "../../model/UserModel";

export async function signUp(authRequest, warning) {

    const response = await fetch('/api/auth/signup', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(authRequest),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.status === 201) {
        userModel.isRedirect = true;
    }

    if (response.status !== 201) {
        warning.style.visibility = 'visible';
        userModel.isRegistrationSucceed = false;
    }
}