//Registration Script

document.getElementById('registerForm').addEventListener('submit', async function postInfo(event) {
    event.preventDefault();
    
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
            const saltyPassword = salt(password);
            const mdHash = CryptoJS.MD5(saltyPassword).toString();
            console.log('hash: ', mdHash);
            const request = await fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email, username, mdHash})
            });
            if(request.ok){
                alert('Registration Completed');
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
//add !$`+ in random order to password before sending to server
function salt(pword){
    const salt = ['!', '$', '`', '+'];
    const max = pword.length;
    let newPword = pword;
    for(let i = 0; i < salt.length; i++){
        let index = Math.floor(Math.random() * max);
        //separate string and add salt
        newPword = newPword.slice(0, index) + salt[i] + newPword.slice(index);
    }
    return newPword;
}