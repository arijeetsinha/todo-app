require('dotenv').config();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({extended: false});

mongoose.connect(process.env.MONGO);

const todoSchema = new mongoose.Schema({
    item: String
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = (app) => {
    app.get('/todo', async (req, res) => {
    try{
        var data = await Todo.find({});
        res.render('todo', {todos: data});
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
    });
    app.post('/todo', urlencodedParser, async (req, res) => {
        try{
            var data = await Todo.create(req.body);
            res.status(200).json(data);
        }
        catch(error){
            console.log(error.message)
            res.status(500).json({message: error.message})
        }
    });
    app.delete('/todo/:item', async (req, res) => {
        // Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
        //     if(err) throw err;
        //     res.json(data);
        // });
        try{
            var data = await Todo.findOneAndDelete({item: req.params.item.replace(/\-/g, " ")});
            if(!data){
                return res.status(404).json({message: 'cannot find any product'})
            }
            res.status(200).json(data);
        }
        catch(error){
            console.log(error.message)
            res.status(500).json({message: error.message})
        }
    });
}