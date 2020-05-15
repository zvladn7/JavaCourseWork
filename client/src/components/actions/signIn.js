import {userModel} from "../../model/UserModel";
import {marksModel} from "../../model/MarksModel";

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
    userModel.person = data.person;
    marksModel.currentPerson = data.person;
    console.log(data.token)
    console.log(data.person)
    localStorage.setItem("person",JSON.stringify(userModel.person));
    localStorage.setItem("token",JSON.stringify(userModel.token));
}