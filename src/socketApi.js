const socketio = require('socket.io');
const randomColor = require('../helper/randomColor');
const  io = socketio();

const socketApi = {

};

socketApi.io = io;

const  users = {};
io.on('connection',(socket)=>{
    console.log('Foydalanuvchi bog`landi');
    socket.on('newUser',(data)=>{
       const defaultData = {
           id:socket.id,
           postion:{
               x:0,
               y:0
           },
           color:randomColor()

       }
        const userData = Object.assign(data,defaultData);
        users[socket.id] = userData;

        socket.broadcast.emit('newUser', users[socket.id]);
        socket.emit('initPlayers', users);
        socket.on('disconnect',()=>{
            socket.broadcast.emit('disUser', users[socket.id])
            delete users[socket.id];
        })
    });
    socket.on('animate',(data)=>{
        try{
            users[socket.id].postion.x = data.x;
            users[socket.id].postion.y = data.y;

            socket.broadcast.emit('animate',{
                socketId:socket.id,
                x:data.x,
                y:data.y,
            })
        }catch (e) {
            console.log(e);
        }


    })

    socket.on('newMessage',(data)=>{
        socket.broadcast.emit('newMessage',data);
    })
});

module.exports = socketApi;