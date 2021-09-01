function validator(page_name='') {
    console.log(page_name)

    if(page_name=="login") {
        validateEmail();
        validateEmptyEmail();
        validatePassword();
        validateEmptyPassword();
    }


    const form = document.getElementById('signup-page')
    if(form_id=="signup-page"){
        console.log('annnn')
        validateEmail();
        validateEmptyEmail();
        validatePassword();
        validateEmptyPassword();
        validateName();
    }
}

//email validation

function validateEmail() {
    console.log('app')
    const email = document.getElementById('email-section');
    const emailError = document.getElementById('email-error');

    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value))
        emailError.textContent = "";
    else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateEmptyEmail() { 
    const email = document.getElementById('email-section');
    const emailError = document.getElementById('email-error');
 
    if(email.value == "") emailError.textContent = "choose a gmail address";    
};

// password validation

function validateEmptyPassword() {  
    const pwd = document.getElementById('password-section');
    const pwdError = document.getElementById('password-error');
    if(pwd.value == "") pwdError.textContent = "Enter a password";    
};

function validatePassword () {
    const pwd = document.getElementById('password-section');
    const pwdError = document.getElementById('password-error');
    let pwdRegex = RegExp('^[a-zA-Z0-9]{8,}$');
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


