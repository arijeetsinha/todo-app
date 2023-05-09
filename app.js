var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');
//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//listen to port
app.listen(3000, ()=>{
    console.log("Node API app is running on port 3000")
});
console.log("Listening to port 3000");

//fire controllers
todoController(app);