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

router.get('/all', (req, res) => {
	console.log("View Product");
	var response = {}
	connection.query('select * from Products;', function(err, result){
        if(err){
            console.log("listing error : " + err);
            res.json(response)
            return
        }
    	//console.log(result);
    	res.json(result)
    	return
	})
    return
})

router.get('/user/:uids', (req, res) => {
	var response = {}
	var uid = req.params.uids;
	connection.query('select name From Users where id=' + uid+  ';', function(err, result){
        if(err){
            console.log("translation error : " + err);
            res.json(response)
            return
        }
    	res.json(result)
    	return
	})
    return
})

module.exports = router;