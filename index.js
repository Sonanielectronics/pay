
// cd YourServerPath
// npm uninstall socket.io
// npm install socket.io@2.1.1

var app=  require('express')();
//const app = express();
 var http = require('http').Server(app);
 var io = require('socket.io')(http);

 var jwt = require("jsonwebtoken");

 var SECRET_KEY = process.env.SECRET_KEY || "YOURSECRETKEYGOESHERE";

 app.get('/', function(req, res){
     res.send('<h1>Hello world</h1>')
 });

//app.use(express.json());
//app.use(express.urlencoded());
 
 io.on('connection', function(socket){

    socket.on('disconnect',function () {

         console.log('User Disconnected...')
         socket.emit('disconn', {"name": "User Disconnected..."});

    });

    socket.on('messages',function (msg) {

        console.log('HELLO');
        console.log(msg);

    });

	socket.on('vv',function (msg) {

		console.log('its form unity');
		console.log(msg);
		socket.emit('ABC', {"name": "vivek"});

    });

    socket.on('StartCheck',function (msg) {

        //const Name = JSON.stringify(msg);
        var token = jwt.sign({ username: msg.UserName }, SECRET_KEY);
        var a = {"token":token}
        console.log(a);
        const x = msg["UserName"];
        console.log(`a user connected ${x}`);
		socket.emit('Conne', msg);
        socket.emit('token', a);

    });

    socket.on('Onpay',function (data) {

        try{

            if(jwt.verify(data.token, SECRET_KEY)){

                console.log("OnpayEventCall from unity");

            }

        }catch(err){

            console.log(" invalid token ");

        }

    });

 });

 http.listen(80, function(){

     console.log('listening on *:80');

 });