//Registration Script

document.getElementById('registerForm').addEventListener('submit', async function postInfo(event) {
    event.preventDefault();
    const formType = 'registration';
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('re-enter').value;

    const cond = validatePassword(password);
    
    if(cond.length != 0){
        document.getElementById('pass-Error').innerHTML = cond;
    }else{
        document.getElementById('pass-Error').innerHTML = '';
    }
    if(password === repassword){
        try{
            //Send password to server where encryption/authentication will occur
            const request = await fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({formType, email, username, password})
            });
            if(request.ok){
                alert('Registration Completed');
                window.location.href = 'loginIndex.html';
            }else{
                console.log('Registration failed');
            }
        }catch (error){
            console.error('Something went horribly wrong\n', error);
        }
    }else{
        document.getElementById('re-enterError').innerHTML = 'Passwords must match';
    }
});
function goHome(){
    window.location.href="../index.html";
}

/*
    Passwords must be at least 6 characters in length,
    have a mix of capital letters, and at least one number
*/
function validatePassword(pword){
    errMessageQ = [];
    if(pword.length < 6){
        errMessageQ.push('Length must be greater than 6 characters ');
    }
    if(pword.search(/[0-9]+/) == -1){
        errMessageQ.push('Must contain at least one number ');
    }
    if(pword.search(/[a-z]+/) == -1){
        errMessageQ.push('Must contain at least one lowercase letter ');
    }
    if(pword.search(/[A-Z]+/) == -1){
        errMessageQ.push('Must contain at least one uppercase letter ');
    }
    return errMessageQ;
}
