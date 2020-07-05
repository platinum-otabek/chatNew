app.factory('indexFactory',[()=>{
    const connectSocket = (url,options)=>{
        const socket = io.connect(url, options);
        return new Promise((resolve,reject)=>{
            socket.on('connect', ()=>{
                resolve(socket)
            })
            socket.on('connect_error',()=>{
                reject(new Error('connect_error'));
            })
        });

    };
    return{
        connectSocket
    }
}])