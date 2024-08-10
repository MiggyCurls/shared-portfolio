//Server Code with Express Framework
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const path = require('path');
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
let users = [];
let data = "";
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'public','registry.txt'));
});
app.post('/', (req, res) =>{
    res.status(200).send({status: 'received'});
    const body = req.body;
    users.push({email: body.email, username: body.username, password: body.mdHash});
    //Separate each JSON object in users with a new line
    data = makePretty(JSON.stringify(users));
    //Look into append to file after day one of putting into production
    fs.writeFile('public/registry.txt', data, err =>{
        if(err){
            console.error(err);
        }
    });
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