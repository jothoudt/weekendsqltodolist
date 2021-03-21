const express= require('express');
const router = express.Router();

const pool = require('../pool')

//post route
router.post('/', (req, res) => {
    let newTask= req.body;
    let queryText=`INSERT INTO "toDo" ("task", "completed") VALUES ($1, $2)`;
    pool.query(queryText, [newTask.task, newTask.completed]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error adding task', error);
        res.sendStatus(500);
    })
})//end POST
//get route
router.get('/', (req, res) =>{
    let queryText=`SELECT * FROM "toDo" ORDER BY "id";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error =>{
        console.log('error getting list', error);
        res.sendStatus(500);
    })
})//end GET
//delete route
router.delete('/:id', (req,res) =>{
    console.log('list Delete', req.params);
    let queryString= `DELETE FROM "toDo" WHERE "id"=$1`
    pool.query(queryString, [req.params.id]).then((results) => {
        res.sendStatus(200);
    }).catch((err)=> {
        console.log(err);
        res.sendStatus(500);
    })
})//end DELETE
//put route
router.put('/:id', (req,res) =>{
    let queryString=`UPDATE "toDo" SET "completed"=true, "completeTime"=$2 WHERE "id"=$1;`
    pool.query(queryString,[req.params.id, req.body.completeTime]).then((results)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})//end PUT

module.exports = router;