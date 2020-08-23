const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const dataService = require('./server/data.js');
// const WebSocket = require('ws');

// Get our API routes
const api = require('./server/routes/api');
const app = express();
const server = http.Server(app);
//initialize the WebSocket server instance
// const wss = new WebSocket.Server({ server });
const wss = require('socket.io')(server);
app.use(express.static('static'))
app.use('/', express.static('static', { index: 'index.html' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(function (req, res, next) {
    console.log(req.headers.host + '/' + req.url)
    next()
});

// Set our api routes
app.use('/qna', api);
app.use('/message', api);
//websocket
wss.on('connection', (socket) => {
    console.log('a user connected with socket ID -' + socket.id);
    socket.send('Hi there, I am a WebSocket server');
    socket.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    }); 
    socket.on('qevent', (eventData) =>{
        console.log("eventData" + JSON.stringify(eventData))
        if (eventData.status == 2) {
            dataService.activate_question(eventData.questionID);
        }
        socket.broadcast.emit('qevent',eventData);
    })
    socket.on('aevent', (eventData) =>{
        console.log("eventData" + JSON.stringify(eventData));
        dataService.update_student_data(eventData);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

app.on('error', function (error, req, res) {
    console.log('proxy error\n' + error.toString());
    if (!res.headersSent) {
        res.writeHead(500, {
            'content-type': 'application/json'
        });
        var json = {
            error: 'proxy_error',
            reason: error.message
        };
        res.end(JSON.stringify(json));
    }
    
});

//start our server
var port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () =>
{console.log(`Server started on port 3000 :)`);
});
// server.listen(process.env.PORT || 8999, () => {
//     console.log(`Server started on port ${server.address().port} :)`);