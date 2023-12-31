"use strict";

const url = "https://criteria-providers.onrender.com/api";

import { displayErrorAlert } from "./utils/displayUsers.js";
import {emailValidator} from "./utils/validator.js";
//const url = "http://localhost:8080/api";

const loginForm = document.getElementById('login_form');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = loginForm.elements.email.value;
    const password = loginForm.elements.password.value;

    const data = {
        email: email,
        password: password
    };

    if(!emailValidator(email)){
        return displayErrorAlert("Email incorrecto.");
    };

    try {
        const response = await fetch(`${url}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const responseData = await response.json();
        const token = responseData.token;
        const user = responseData.user;
        const tokenExpiration = new Date().getTime() + 2 * 60 * 60 * 1000;

        localStorage.setItem('token', token);
        //console.log(localStorage.getItem(token));
        localStorage.setItem('tokenExpiration', tokenExpiration);
        localStorage.setItem('user', JSON.stringify(user));

        window.location.href = 'home.html';
    } catch (error) {
        displayErrorAlert("Usuario o contraseña incorrectos.");
    };
});