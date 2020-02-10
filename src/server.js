import express from 'express';
import request from 'request';
import React from 'react';
import {
    renderToString
} from 'react-dom/server';
import App from './app';
import template from './template';

const server = express();

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
            const isMobile = false;
            const initialState = {
                isMobile
            };
            const appString = renderToString( < App {
                    ...initialState
                }
                />);

                res.send(template({
                    body: appString,
                    title: 'Hello World from the server',
                    initialState: JSON.stringify(initialState)
                }));
            });

server.get("/accounts", (req, res) => {
    var result = getAllStudents();
    result.then(function(result) {
        console.log("Response found - " + JSON.stringify(result));
        res.send(result);
    });
});




server.listen(3000); console.log('listening');