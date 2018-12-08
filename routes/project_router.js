const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel')

//routes
router.get('/', (req , res) => {
    db.get()
    .then((project) => {
        res.json(project)
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Project information could not be retrieved."})
    })
});


module.exports = router;