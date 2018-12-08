//create an express server
const express = require('express');
const helmet = require('helmet')
const logger = require('morgan')

const projectRouter = require('./routes/project_router.js')
const actionRouter = require('./routes/action_router.js')

const server = express();
const PORT = 3000;

//middleware
server.use(
    express.json(),
    logger('dev'),
    helmet(),
)


server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


server.get('/', (req , res) => {
    res.send("We're Live, Hello World");
})

//routes







//listen
server.listen(PORT, err => {
    console.log(`server is up and running on ${PORT}`);
})


