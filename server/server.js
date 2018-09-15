const path = require('path');
const express = require('express');

console.log(__dirname + '/../public');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

var app = express();
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.listen(port, () =>{
    console.log(`Server is up and running on ${port}`);
});

