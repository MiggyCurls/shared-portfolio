//Registration Script

document.getElementById('registerForm').addEventListener('submit', async function postInfo(event) {
    console.log('reached here');
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('re-enter').value;
    //document.getElementById('email').required = true;
    if(password === repassword){
        console.log('passwords match');
    }
    
    try {
       const request = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email, username, password})
       });
       if (request.ok){
        alert('Registration Completed');
       }else{
        console.log('Registration went wrong');
       }
    } catch (error) {
        console.error('Something went horribly wrong\n', error);
    }
});
function goHome(){
    window.location.href="../index.html";
}