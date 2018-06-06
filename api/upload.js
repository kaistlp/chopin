var express = require('express');
var mysql = require('mysql');
var util = require("util");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'public',
  password : 'kaistlp',
//  port     : 22,
  database : 'sad_db'
});

var router = express.Router();



router.get('/new/:pname/:pinitial/:pmax', (req, res) => {
    var pname = req.params.pname;
    var pinitial = req.params.pinitial;
    var pmax = req.params.pmax;  
    var sess = req.session;
    var uid = sess.uid;

    var sess = req.session;
    console.log(pname);
    var flag = 0;
    connection.query('INSERT INTO Products(uid, pname, max_price, init_price, is_sold, reg_time) VALUES ("' + 
     sess.userid + '", "'+ pname + '", "' + pmax + '", "' + pinitial + '", "N", "201701010000");', function(err, result){
     	console.log(err)
     	if (err){
     		flag = 1
     	}
    })

    res.json(flag)
})

router.get('/description/:description/', (req, res) => {
    var description = req.params.description;
    var pid = 50;
    connection.query('select pid from Products;', function(err, result){
    	pid = result.length
    	console.log(result)
    	console.log(pid)
    	connection.query('INSERT INTO Descriptions(pid, name, value) VALUES ("' +  pid + '", "description", "' + description+ '");', function(err, result){
    	res.json(err)
    })
  })



})

router.get('/option/:fieldname/:fieldvalue', (req, res) => {
    var fieldname = req.params.fieldname;
    var fieldvalue = req.params.fieldvalue;
    var pid = 0;
    connection.query('select pid from Products;', function(err, result){
    	pid = result.length

        connection.query('INSERT INTO Descriptions(pid, name, value) VALUES ("' +  pid + '", "'+fieldname+'", "' + fieldvalue+ '");', function(err, result){
    	console.log(err)
    	res.json(err)
    })
 })


})

module.exports = router;