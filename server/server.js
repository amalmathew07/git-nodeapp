
const mongoose = require('../DBPlugins/mongooseplugin').mongoose;
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');

var Province = require('../models/Provinces').Province;

var express = require('express');
var app = express();

var bodyparser = require('body-parser');

app.use(bodyparser.json());

app.post('/insertprovinces',(req,res) => {

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
    if (err) {

    }
    let insertProvinces = [{
        Zip : 'KOSS', city : 'Hamilton'
    },
    {
        Zip : 'K0B', city : 'Toronto'
    }]

    const db = client.db('TodoApp');

    db.collection('Provinces').insertMany(insertProvinces).then((docs) => {
        res.json(docs);
    })
})
})



app.post('/insertprovince',(req,res) => {

    let insertProvince = new Province({
        Zip : 'JJJ', city : 'Oshawa'
    })

    insertProvince.save().then((doc) => {
        jwt.sign({Zip:insertProvince.Zip},'salt',(err,token) => {
            res.header('x-auth',token).json(doc);
        })
    }).catch((err) => {
        res.status(404);
    })
})

app.get('/getprovince',verifyToken,(req,res) => {
    Province.find({}).then((docs) => {
      
      jwt.verify(req.token,'salt',(err,data) => {
         if (err) {
            res.status(404).send("Not authorized");
         } else {
        res.json(docs);
        addCode(docs).then((code) => {
        console.log(code);
        });  
        }
      })  

    }).catch((err) => {
        res.status(400).send(err);
    })  
})

var x = [];

var addCode = (docs) => {
    return new Promise((resolve,reject) => {
        if (docs != undefined) {
           resolve(docs.map((a,i,docs) => {
            docs[i].Zip = docs[i].Zip + "ZZZ";
            return docs[i];
           }));
        } else {
            reject("Error");
        }
    })
}

function verifyToken(req,res,next) {
    req.token = req.headers['x-auth'];
    next();
}

var arr = [1,2,3,4];
var resItem = [];
var arrFn = (arrInp) => {
    return new Promise((resolve,reject) => {
        resolve(arrInp.forEach((item,i) => {
            resItem[i] = calcFn(item);
        })); 
    })
}

var calcFn = (x) => {
    return (x + 10);
}

var count = 0;
arrFn(arr).then(() => {
    console.log(resItem);
    console.log("AAAA");
})



app.listen(3000 ,()=>{
    console.log("Listening at 3000")
});

