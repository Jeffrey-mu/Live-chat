var app = require('express')();
var server = require('http').Server(app);
var WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 8080 });
const data = {
  content: '',
  uselist: []
}
wss.on('connection', function connection(ws) {
  console.log('server: receive connection.');

  ws.on('message', function incoming(message) {
    console.log('server: received: %s', message);
    wss.clients.forEach(el => {
      el.send(JSON.stringify(data))
    })
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(3000);
