const express =require('express');
const bodyParser = require('body-parser');
const child_process = require('child_process');
const fs = require('fs');
const cors = require('cors');
const zipFolder = require('zip-a-folder');
const app = express();
const test = require('./app/start');

app.use(cors());

// create application/json parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/',(req,res)=>{
    console.log(req.body);
    if(fs.existsSync('./project')){
        var child = require('child_process').exec("rm -rf project");
        child.on('exit', function() {
            console.log("I AM HERE")
            fs.mkdirSync('./project');
            fs.mkdirSync('./project/routes');
            fs.mkdirSync('./project/config');
            fs.mkdirSync('./project/models');
            test.start(req.body.project,req.body.author);
        });
    }else{
        fs.mkdirSync('./project');
        fs.mkdirSync('./project/routes');
        fs.mkdirSync('./project/config');
        fs.mkdirSync('./project/models');
        test.start(req.body.project,req.body.author);
    }
    res.json({message:'project Created'});
});
app.post('/routes',(req,res)=>{
    test.routesAndModels(req.body.projects);
    res.json({message:'Model & Route Generated'});
});

app.get("/downloads/:name", async (req, res) => {
    if(fs.existsSync('./project')){
        await zipFolder.zip('./project','./'+req.params.name+'.zip');
    }
    setTimeout(() => {
        res.download('./'+req.params.name+'.zip');
    }, 2000);
});

const deleteFolderRecursive = function(path) {
    var child = require('child_process').exec("rm -rf project");
    child.on('exit', function() {
        fs.mkdirSync('./project');
        fs.mkdirSync('./project/routes');
        fs.mkdirSync('./project/config');
        fs.mkdirSync('./project/models');
    });
};
app.listen(4001,()=>{
    console.log('SERVER IS RUNNING ON 4001');
});