/*
    Login to verify user information will be sent
    to server to check credentials
*/

document.getElementById('loginForm').addEventListener('submit', async function login(event){
    event.preventDefault();
    const formType = 'login';
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try{
        const response = await fetch('http://localhost:8080/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({formType, username, password})
        });
        if(response.status == 200){
            console.log('User has an account and is logged in :)');
            alert('You have logged in to your account :)');
            //redirect users to some place perhaps??
        }else{
            const str = 'No account found with username: ' + username;
            document.getElementById('noAccountFound').innerHTML = str;
        }
    }catch(error){
        console.error("failed poorly ", error);
    }
});

function goBack(){
    window.location.href = "../index.html";
}

