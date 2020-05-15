export async function signUp(authRequest) {

    const response = await fetch('/api/auth/signup', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(authRequest),
        headers: {
            "Content-Type": "application/json"
        }
    });
}