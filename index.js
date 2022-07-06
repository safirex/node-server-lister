const express = require("express");
const app = express();
const port = 8080;
var fs = require("fs");
const servers = require('./servers.json');



const serverList =new Map(); //fuck the RAM
//setup a json parser
app.use(express.json());




app.get('/',(request,response) =>{
    response.status(200).send("Server Running");
});

app.post('/servers', (req,res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
    serverList.set(req.query.name,ip);
    res.status(200).send(JSON.stringify([...serverList]));
});

app.delete('/servers', (req,res) => {
    serverList.delete(req.query.name,req.query.address);
    res.sendStatus(200);
});



// app.post('/servers', (req,res) => {
//     // servers.push(req.body);
//     console.log(req.query);
//     fs.appendFile("./servers.json", JSON.stringify(req.query),(err)=>{console.log(err);});
//     console.log(servers.find(server => server.address === '124.25.310.120'));
//     res.status(200).json(servers);
// });

app.listen(
    port,
    () =>   console.log( `server has been started on http://localhost:${port}`)
);