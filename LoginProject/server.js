//Server Code with Express Framework
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
let users = [];

app.get('/', (req, res) =>{
    res.send(users);
});
app.post('/', (req, res) =>{
    res.status(200).send({status: 'received'});
    const body = req.body;
    users.push({email: body.email, username: body.username, password: body.password});
});
app.listen(port, () =>{
    console.log(`server running at : ${port}`);
});