const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const router= require('./modules/routes/list.router');
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/listofthings', router)

app.listen(PORT, ()=>{
    console.log('listening on port', PORT)
})