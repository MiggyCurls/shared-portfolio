//Server Code with Express Framework
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const path = require('path');
const crypto = require('crypto-js');
//text file to hold username and passwords
const fs = require('fs');
fs.readFile('public/registry.txt','utf-8', (err, data) =>{
    if(err){
        console.error(err);
        return;
    }
    if(data.length == 0){
        console.log('no data present :(');
    }
});
app.use(bodyParser.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let data = "";
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'public','registry.txt'));
});
app.post('/', (req, res) =>{
    //res.status(200).send({status: 'received'});
    const body = req.body;
    //Separate post requests from registration and login
    if(body.formType == 'registration'){
        res.status(200).send({status: 'received'});
        const salt = addSalt(body.password);
        const hash = crypto.MD5(salt[1]);
        //users.push({email: body.email, username: body.username, password: hash.toString(), salt: salt[0]});
        //Separate each JSON object in users with a new line
        //data = makePretty(JSON.stringify(users));
        /*
        First create a user array that is empty to store users to be put into JSON format
        access registry file and check to add anything that is there (can be nothing) to
        users array and then write to file after to keep it one big array of users
        */
        try{
            let users = [];
            let data = fs.readFileSync('public/registry.txt');
            if(data.length != 0){
                users = JSON.parse(data);
                //console.log(users);
            }
            users.push({email: body.email, username: body.username, password: hash.toString(), salt: salt[0]});
            data = makePretty(JSON.stringify(users));
            fs.writeFile('public/registry.txt', data, err => {
                if(err){
                    console.error(err);
                }
            });
            
        }catch(err){
            console.log('reading/writing to user registry failed. ', err);
        }
        /*
        //Look into append to file after day one of putting into production
        fs.appendFile('public/registry.txt', data, err =>{
            if(err){
                console.error(err);
            }
        });*/
    }else{
        //formType must be a login
        //Check login information
        const body = req.body;
        const uName = body.username;
        let supposedPWord = body.password;
        /*
            Read through registry file to find username and its corresponding salt,
            then add salt to password and hash
            see if hashed password matches what is in the registry
        */
        try{
            const data = fs.readFileSync('public/registry.txt');
            const users = JSON.parse(data);
            let index;
            let userExists = false;
            let salt;
            for(let i = 0; i < users.length; i++){
                if(users[i].username == uName){
                    salt = users[i].salt;
                    userExists = true;
                    index = i;
                    break;
                }else{
                    index = -1;
                }
            }
            supposedPWord += salt;
            const supposedHash = crypto.MD5(supposedPWord);
            if(index != -1 && supposedHash == users[index].password){
                res.status(200).send();
            }else{
                res.status(401).send('No user found with corresponding username to password');
            }
        }catch(err){
            console.error('File read error:', err);
        }
        
    }
    
});

app.listen(port, () =>{
    console.log(`server running at : ${port}`);
});

function makePretty(data){
    let pretty = "";
    for(let i = 0; i < data.length; i++){
        pretty += (data[i]);
        if(data[i] == '}'){
            pretty += '\n';
        }
    }
    return pretty;
}

//Salting password with RNG 
function addSalt(pword){
    const randNum = Math.floor(Math.random() * 1000000);
    const newPword = pword + randNum;
    const saltyPassword = [randNum, newPword];
    return (saltyPassword);
}


