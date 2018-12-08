//create an express server
const express = require('express');
//const helmet
//const logger

//const projectRouter
//const actionRouter

const server = express();
const PORT = 3000;


server.get('/', (req , res) => {
    res.send("We're Live, Hello World");
})

//listen
server.listen(PORT, err => {
    console.log(`server is up and running on ${PORT}`);
})


