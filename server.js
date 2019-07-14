const app=require('./backend/app')
const http=require("http")
const debug=require("debug")("node-angular")


const normalizedPort=val=>{
    var port = parseInt(val,100)

    if(isNaN(port)){
        return val
    }
    if(port>=0){
        return port
    }
    return false
}
const onError=error=>{
    if(error.syscall!=="listen"){
        throw error
    }
    const bind= typeof addr==='string'?'pipe' +addr:"port"+port
    switch(error.code){
        case "EACCES":
            console.error(bind+"requires elevated privilages")
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(bind+"requires elevated privilages")
            process.exit(1)
            break
        default:
            throw error
    }
};
const onListening=()=>{
    const addr=server.address()
    const bind= typeof addr==='string'?'pipe' +addr:"port"+port
    debug("listening on"+port)
}

const port=normalizedPort(process.env.PORT||3000)
app.set("port",port)

const server=http.createServer(app)
server.on("error",onError)
server.on("Listening",onListening)
server.listen(port)