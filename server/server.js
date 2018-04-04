const user=require('./user')
const bodyParser=require('body-parser')
const cookieParser=require("cookie-parser")
const express=require('express')
const  http=require('http')
const model=require('./modal')
const  User = model.getModel("user")
const  Chat = model.getModel("chat")
const path=require("path")

var app=express()
var server=http.createServer(app)
var io=require('socket.io').listen(server)
io.on("connection",function(socket){
     socket.on('sendmsg',function(data){
          const {from ,to ,msg} =data
          const chatid=[from,to].sort().join("_")
          Chat.create({chatid,from,to,content:msg},function(err,doc){
               if(!err){
                    console.log(doc._doc)
                    io.emit("recvmsg",doc._doc)
               }
          })
     })
})

var allowCrossDomain = function (req, res, next) {
     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.header('Access-Control-Allow-Credentials', 'true');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     next();
};

app.use(allowCrossDomain)
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',user);
app.use(function(req,res,next){
     if(req.url.startsWith("/user/")||req.url.startsWith("/static/")){
        return   next()
     }
    return res.sendFile(path.resolve("build/index.html"))
})
app.use("/",express.static(path.resolve("build")))
server.listen(9093,function(){
     console.log('socket.io is bad')
});





