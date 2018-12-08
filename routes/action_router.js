const express = require('express');
const router = express.Router();

const db2 = require('../data/helpers/actionModel.js')

//routes
router.get('/', (req , res) => {
    db2.get()
    .then((action) => {
        res.json(action)
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Action information could not be retrieved"})
    });
});

module.exports = router;