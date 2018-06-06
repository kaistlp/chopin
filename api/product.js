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
	connection.query('select * from Products;', function(err, result){
        if(err){
            console.log("signin error : " + err);
            return
        }
    	console.log(result);
    	return
	})
    return
})


module.exports = router;