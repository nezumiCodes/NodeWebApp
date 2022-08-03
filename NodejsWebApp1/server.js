'use strict';
const http = require('http');
const fs = require('fs');//to read files

var port = 3000;//can be any available port for node.js server

//const { parse } = require('querystring');

const server = http.createServer((req, res) => {     
    console.log('request made')    

    //set header content type
    res.setHeader('Content-Type', 'text/html');//can text/plain

    //showing HTML page based on URL passed
    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blash':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //read an html file 
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();//close the response in case of error
        } else {
            //write the html file data to browser[use this option for writing multiple data items]
            //res.write(data);

            //finally tell the server to show response to browser by passing the html file data
            res.end(data);
        }
    })    
});

server.listen(port, 'localhost', () => {
    console.log('listening for requests on port 3000')
});