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
            addRain();
            makeRain();
            cleanRain();
            alert('You have logged in to your account :)');
            
            //redirect users to some place perhaps??
        }else{
            const str = 'No account found with username: ' + username;
            document.getElementById('errorBox').innerHTML = str;
        }
    }catch(error){
        //Server is most likely not up and running;
        document.getElementById('errorBox').innerHTML = 'Server is not running at this time, please try again a different time';
        console.error("failed poorly ", error);
    }
});

function goBack(){
    window.location.href = "../index.html";
}
function addRain(){
    for(let i = 1; i < 21; i++){
        let str = i + 'c';
        let element = document.getElementById(str);
        element.classList.add('confetti');
    }
}
function makeRain(){
    const elements = document.getElementsByClassName('confetti');
    for(let i = 0; i < elements.length; i++){
        elements[i].style.width = '15px';
        elements[i].style.height = '15px';
        elements[i].style.display = 'inline-block';
        elements[i].style.position = 'relative';
        elements[i].style.transformOrigin = 'left top';
    }
    
}
function cleanRain(){
    for(let i = 1; i < 21; i++){
        let str = i + 'c';
        let element = document.getElementById(str);
        element.addEventListener('animationend', function(){
            element.classList.remove('confetti');
        });
    }
    /*iterating by two through divs with class name, look into it
    const elements = document.getElementsByClassName('confetti');
    console.log('elements: ', elements);
    for(let i = 0; i < elements.length; i++){
        console.log('i: ',i, ' elements: ', elements[i]);
        elements[i].classList.remove('confetti');

    }*/
}