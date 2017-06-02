var fs=require("fs"),
    childProcess = require('child_process'),

    serverName="./build/dev-server.js",

    mainServer = childProcess.fork(serverName);

mainServer.on('uncaughtException', function(e) {
    console.log("master on error");
　　 console.log(e);
    restartServer();
});

process.on('exit', function () {
　　console.log('master exit!');
});

process.on('uncaughtException', function(e) {
    console.log("master on error");
    console.log(e);
    restartServer();
});

function restartServer(){
    console.log("master restart...");
    killServer();

    mainServer = childProcess.fork(serverName);
    console.log("new server is built!\n");
}

function killServer(){
     try{
         process.kill(mainServer.pid);
     }catch(ex){
         console.log("master: ",ex);
     }
}