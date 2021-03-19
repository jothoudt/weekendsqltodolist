const express= require('express');
const router = express.Router();

const pool = require('../pool')

router.post('/', (req, res) => {
    let newTask= req.body;
    let queryText=`INSERT INTO "toDo" ("task", "completed") VALUES ($1, $2)`;
    pool.query(queryText, [newTask.task, newTask.completed]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error adding task', error);
        res.sendStatus(500);
    })
})

module.exports = router;