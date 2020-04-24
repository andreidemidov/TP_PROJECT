import { LOGIN_URL, REGISTER_URL } from "../constants";

export const userService = {
    Login,
    Register
};

// function Login(email, pass) {
//     const data = {
//         emailAddress: email,
//         password: pass
//     }
//     fetch(LOGIN_URL, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//     }).then(response => {
//              response.json().then((result) => {
//             console.warn("result", result);
//             localStorage.setItem('login', JSON.stringify({
//                 login: true,
//                 token: result.token
//             }))
//         })
//     })
// }

async function Login(email, pass) {
    debugger;
    const data = {
        emailAddress: email,
        password: pass
    }

    let response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

async function Register(user) {
    debugger;
    await fetch(REGISTER_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    }).then(response => {
        response.json().then((result) => {
            console.warn("result", result);
        }).catch(function(error) {
            console.log(error);
        });
    })

    // let response = await fetch(REGISTER_URL, {
    //     method: "POST",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(user),
    // });
    // return await response.json();
}
