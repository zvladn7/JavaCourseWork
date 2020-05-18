import {userModel} from "../../model/UserModel";
import {marksModel} from "../../model/MarksModel";

export async function signIn(authRequest, warning) {

    const response = await fetch('/api/auth/signin', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(authRequest),
        headers: {
            "Content-Type": "application/json"
        }
    });

    userModel.isPresent = response.status === 200;
    if (response.status === 200) {
        const data = await response.json();
        userModel.token = data.token;
        userModel.person = data.person;
        marksModel.currentPerson = data.person;
        localStorage.setItem("person", JSON.stringify(userModel.person));
        localStorage.setItem("token", JSON.stringify(userModel.token));
    } else {
        warning.style.visibility = 'visible';
    }
}