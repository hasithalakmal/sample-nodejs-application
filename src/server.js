const express = require('express');
const request = require('request');
const path = require('path');

const server = express();
server.use(express.static(path.join(__dirname, '/app/')));

var getAllStudents = function() {
    return new Promise(function(resolve, reject) {
        request.get("http://localhost:8080/account-api/service/accounts", (error, response, body) => {
            if (error) {
                console.log(error);
                return console.dir(error);
            }
            resolve(body);
        });
        setTimeout(function() {
            resolve();
        }, 1000);
    });
}

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

server.get("/accounts", (req, res) => {
    var result = getAllStudents();
    result.then(function(result) {
        console.log("Response found - " + JSON.stringify(result));
        res.send(result);
    });
});




server.listen(3000); console.log('listening');