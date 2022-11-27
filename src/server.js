/* eslint  @typescript-eslint/no-var-requires: 0 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '../../dist'));

app.listen(PORT, function () {
    console.log(`app listening on port ${PORT}!`);
});

app.get('*', function(req, res){
    res.sendFile(
        path.join(__dirname + '../../dist/index.html')
    );
});


