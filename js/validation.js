var axios = require("axios");

function validateAndFetchData(function_name='') {
    const name = document.getElementById('name-section');
    const email_id = document.getElementById('signup-email-section');
    const password = document.getElementById('signup-password-section');
    const phone = document.getElementById('phone-section');

    if(function_name=='login') {
        const login_email = document.getElementById('email-section')
        const login_password = document.getElementById('password-section')
        validateLoginEmail();
        validateLoginPassword();
        const headerconfig = {   
            'Content-Type': 'application/json',
            // 'authorization': localStorage.getItem('token')
          };
        let data = {
            "email": login_email.value,
            "password": login_password.value
        }
        postService("/bookstore_user/login", data, headerconfig)
        .then(res=> {
            console.log(res.data);                    
                localStorage.setItem("token", res.data.result.accessToken);  
                window.location.replace('../pages/dashboard.html');      
        })  
        .catch((err) => {
            console.log(err);
        }) 
    }

    if(function_name=='signup'){
        validateSignupEmail();
        validateSignupPassword();
        validateName();
        validatePhone();
        const headerconfig = {   
            'Content-Type': 'application/json',
            // 'authorization': localStorage.getItem('token')
          };
        let data = {
            "fullName": name.value,
            "email": email_id.value,
            "password": password.value,
            "phone": phone.value
        };
        if (function_name === "signup") { 
            postService("/bookstore_user/registration", data, headerconfig)
                .then(res=> {
                    console.log(res);        
                })     
                .catch((err) => {
                    console.log(err);
                }) 
            } 
    }
}

//email validation

function validateLoginEmail() {
    const email = document.getElementById('email-section');
    const emailError = document.getElementById('email-error');

    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value))
        emailError.textContent = "";
    else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateSignupEmail() {
    const email = document.getElementById('signup-email-section');
    const emailError = document.getElementById('signup-email-error');

    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value))
        emailError.textContent = "";
    else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateLoginPassword () {
    const pwd = document.getElementById('password-section');
    const pwdError = document.getElementById('password-error');
    let pwdRegex = RegExp('^[a-zA-Z@0-9]{6,}$');
    if (pwdRegex.test(pwd.value))
        pwdError.textContent = "";
    else pwdError.textContent = "use 8 character or more for your password";        
}

function validateSignupPassword () {
    const pwd = document.getElementById('signup-password-section');
    const pwdError = document.getElementById('signup-password-error');
    let pwdRegex = RegExp('^[a-zA-Z@0-9]{6,}$');
    if (pwdRegex.test(pwd.value))
        pwdError.textContent = "";
    else pwdError.textContent = "use 8 character or more for your password";        
}

// name validation    

function validateName() {
    const name = document.getElementById('name-section');
    const nameError = document.getElementById('name-error');    

    if(name.value == "") nameError.textContent = "Enter your full name";        
}

// phone number validation

function validatePhone() {
    const phone = document.getElementById('phone-section');
    const phnError = document.getElementById('phone-error');
    let pwdRegex = RegExp('^[0-9]{10}$');
    if (pwdRegex.test(phone.value))
        phnError.textContent = "";
    else phnError.textContent = "use 10 character or more for your phone number";
}

// function changePage() {
//     window.history.pushState('1signin', 'Title', 'http://127.0.0.1:5500/pages/1signin.html');
// }

// function changesigninPage() {
//     window.history.pushState('1signin', 'Title', 'http://127.0.0.1:5500/pages/1login.html');
// }

