const express = require('express');
const router = express.Router();

const db2 = require('../data/helpers/actionModel.js')

//routes
router.get('/', (req , res) => {
    db2.get()
    .then((actions) => {
        res.json(actions)
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Action information could not be retrieved"})
    });
});

router.post('/', (req, res) => {
    const action = req.body;
    console.log('action from body', action)

    if (action.project_id && action.description && action.notes) {

        db2.insert(action).then(idInfo => {
            db2.get(idInfo.id).then(action => {
                res.status(201).json(action);
            });
        }).catch(err => {
                res 
                .status(500)
                .json({message: "failed to insert action into database"})
        });

    } else {
        res.status(400).json({message: "status 400: missing action project_id, description and notes"})
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db2.remove(id).then(count => {
        if (count) {
            res.json({message: "successfully deleted action"})
        } else {
            res 
            .status(404)
            .json({message: "invalid id"})
        }
    }).catch(err => {
        res 
            .status(500)
            .json({message: "fail to delete action"});
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const action = req.body;
    //combine GET , POST , DELETE

    if (action.project_id && action.description && action.notes) {

        db2.update(id, action)
        .then(count => {
            if (count){
                //200 successful update
                db2.get(id).then(action => {
                    res.json(action)
                });
            } else {
                //404 invalid id
                res 
                .status(404)
                .json({message: "invalid id"});
            }
        })
        .catch(err => {
            //500 catch-all, something else went wrong
            res 
            .status(500)
            .json({message: "ssomething went wrong, fail to update action"})
        })


    } else {
        //400 error 
        res.status(400).json({message: "status 400: missing project id, description and notes"})
    }
})


module.exports = router;