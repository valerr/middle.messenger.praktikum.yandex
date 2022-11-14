const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '../../dist'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

app.get('/register', (req, res) => {
    res.sendFile(
        path.join(__dirname + '../../dist/register.html')
    );
})

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname + '../../dist/index.html')
    );
})

app.get('/chats', (req, res) => {
    res.sendFile(
        path.join(__dirname + '../../dist/chats.html')
    );
})

app.get('/profile', (req, res) => {
    res.sendFile(
        path.join(__dirname + '../../dist/profile.html')
    );
})

app.get('/login', (req, res) => {
    res.sendFile(
        path.join(__dirname + '../../dist/login.html')
    );
})

app.get('/500', function(req, res){
    res.sendFile(
        path.join(__dirname + '../../dist/500.html')
    );
});

app.get('*', function(req, res){
    res.sendFile(
        path.join(__dirname + '../../dist/404.html')
    );
});


