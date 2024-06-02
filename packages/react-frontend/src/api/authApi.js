import API_URL from "./api.js";

function signupUser(user) {
    const promise = fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => {
            if (res.status === 200) {
                res.json().then((payload) =>
                    sessionStorage.setItem("token", payload.token)
                );
                console.log(sessionStorage.getItem("token"));
            } else {
                console.log("Error in signup");
            }
        })
        .catch((error) => {
            console.log(`Signup Error: ${error}`);
        });
}

function loginUser(loginInfo) {
    const promise = fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
    })
        .then((res) => {
            if (res.status === 200) {
                res.json().then((payload) =>
                    sessionStorage.setItem("token", payload.token)
                );
                console.log(sessionStorage.getItem("token"));
            } else {
                console.log("Error in signup");
            }
        })
        .catch((error) => {
            console.log(`Signup Error: ${error}`);
        });
}
