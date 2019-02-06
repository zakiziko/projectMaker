const fs = require('fs');

function start(name,author){
    const jsonText = '{'+'\n'+
    '"name" : "'+name+'",'+'\n'+
    '"version": "1.0.0", '+'\n'+
    '"main": "server.js", '+'\n'+
    '"scripts": { '+'\n'+
    '"start": "node server.js" }, '+'\n'+
    '"author": "'+author+' ", '+'\n'+
    '"license": "ISC", '+'\n'+
    '"dependencies": { '+'\n'+
    '"express": "^4.16.4", '+'\n'+
    '"body-parser": "^1.18.3", '+'\n'+
    ' "mongoose":"^5.4.7" } '+'\n'+
    '}';

    const dbConfigText = 'const config = {'+'\n'+
    'databaseUri : "mongodb://localhost:27017/eBook",'+'\n'+
    'options: { '+'\n'+
    'reconnectInterval: 500, '+'\n'+
    'poolSize: 10, '+'\n'+
    'bufferMaxEntries: 0, '+'\n'+
    'connectTimeoutMS: 10000, '+'\n'+
    'socketTimeoutMS: 45000, '+'\n'+
    'useNewUrlParser: true '+'\n'+
    ' } '+'\n'+
    '}'+'\n'+
    'module.exports=config';

    
    fs.writeFile('./project/package.json', jsonText, function (err) {
        if (err) throw err;
    });
    fs.writeFile('./project/config/db.js', dbConfigText, function (err) {
        if (err) throw err;
    });
}

function routesAndModels(projects){
    let routeList='';
    let routesCall='';
    let modelsCall='';
    let reducerFindModel='';
    projects.forEach(item=>{
        const fileName=item.MOD_NAME+'.js';
        routeList+="app.use('/api', "+item.MOD_NAME+");"+"\n";
        routesCall+="const "+item.MOD_NAME+" = require('./routes/"+item.MOD_NAME+"');"+"\n";
        modelsCall+="const "+item.MOD_NAME+" = require('../models/"+item.MOD_NAME+"');"+"\n";
        let elements='';
        for(let key in item){
            if(key!=='MOD_NAME'){
                let element = " "+key+':'+item[key]+",\n";
                elements+=element;
            }
        }
const router = `
const express = require('express');
const route = express.Router();
const reducer = require('../config/reducer');
let `+item.MOD_NAME+` = require('../models/`+item.MOD_NAME+`');
route.get('/`+item.MOD_NAME+`',(req,res)=>{
    const atts =  `+item.MOD_NAME+`.schema.obj;
    const populateObj=[];
    for(t in atts){
       if(Object.prototype.toString.call(atts[t]).slice(8, -1)=='Object'){
        populateObj.push(t);
       }
    }
   `+item.MOD_NAME+`.find({}).populate(populateObj)
   .exec((err,response)=>{
        if(err) throw err;
        res.json(response);
    });
});
route.get('/`+item.MOD_NAME+`/:id',(req,res)=>{
    `+item.MOD_NAME+`.find({_id:req.params.id},(err,response)=>{
        if(err) throw err;
        res.json(response);
    });
});

route.post('/`+item.MOD_NAME+`',(req,res)=>{
    const atts = `+item.MOD_NAME+`.schema.obj;
    let model = {};
    for(t in atts){
       model[t]=req.body[t];
    }
    const newModel = new `+item.MOD_NAME+`(model);
    newModel.save(function(err,result){
        if(err){
            res.json({'err':err});
        }else{
            const refs = `+item.MOD_NAME+`.schema.obj;
            for(t in refs){
                if(Object.prototype.toString.call(refs[t]).slice(8, -1)=='Object'){
                    reducer.update('`+item.MOD_NAME+`',result._id,t,result[t]);
                }
            }
            res.json(result);
        }
    });
});

module.exports = route;`;

const model = `
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const `+item.MOD_NAME+`Schema = new schema({`+elements+`});
module.exports = mongoose.model('`+item.MOD_NAME+`',`+item.MOD_NAME+`Schema);`;


reducerFindModel+=`
    case '`+item.MOD_NAME+`':
    return `+item.MOD_NAME+`;
    break;
`;

    fs.writeFile('./project/routes/'+fileName, router, function (err) {
        if (err) throw err;
    });
    fs.writeFile('./project/models/'+fileName, model, function (err) {
        if (err) throw err;
    });
});
    const server = "const express =require('express');"+"\n"+
    "const mongoose = require('mongoose');"+"\n"+
    "const bodyParser = require('body-parser');"+"\n"+
    "const db = require('./config/db');"+"\n"+routesCall+
    "const app = express();"+"\n"+
    "app.use(bodyParser.urlencoded({extended:true}));"+"\n"+
    "app.use(bodyParser.json());"+"\n"+
    "const port = 5000"+"\n"+
    `mongoose.connect(db.databaseUri,db.options).then(
        ()=>{console.log('SUCCEFFULY CONNECTED TO MONGODB !!');},
        (err)=>{console.log(err);}
    );`+"\n"+
    "app.listen(port,()=>{console.log('SERVER IS RUNNING ON :'+port)})"+"\n"+routeList;

    const reducer = modelsCall+`

function getModel(model){
    switch (model) {
       `+reducerFindModel+`
        default:
        break;
    }
}

function update(curentModel,curentModelId,distModel,distModelId){
    const crModel = getModel(curentModel);
    const dsModel = getModel(distModel);
    const atts = dsModel.schema.obj;
    for(t in atts){
        if(t==curentModel){
            const obj ={};
            obj[curentModel] = curentModelId;
            dsModel.findByIdAndUpdate(distModelId,{'$push': obj }).exec((err,auth)=>{
                console.log(auth);
            });
        }
    }

   
}
module.exports = {
    update
}

`;

    fs.writeFile('./project/server.js', server, function (err) {
        if (err) throw err;
    });

    fs.writeFile('./project/config/reducer.js', reducer, function (err) {
        if (err) throw err;
    });

}

module.exports={
    start,
    routesAndModels
}
