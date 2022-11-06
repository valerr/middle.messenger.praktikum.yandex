const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

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
        path.join(__dirname + '../../dist/login.html')
    );
})
