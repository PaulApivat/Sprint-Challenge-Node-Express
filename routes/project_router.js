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

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.getProjectActions(id)
    .then((project) => {
        if(project){
            res.json(project);
        } else {
            res 
            .status(404)
            .json({message: "The project with the specified ID cannot be found."})
        }
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Project's actions could not be retrieved."})
    })
})

router.post('/', (req, res) => {
    const project = req.body;
    console.log('project from body', project)

    if (project.name && project.description) {

        db.insert(project).then(idInfo => {
            db.get(idInfo.id).then(project => {
                res.status(201).json(project);
            });
        }).catch(err => {
            res 
            .status(500)
            .json({message: "failed to insert project in database"})
        });

    } else {
        //more specific error message
        res.status(400).json({message: "status 400: missing project name and description"})
    }
})



module.exports = router;