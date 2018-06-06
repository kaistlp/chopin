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
	connection.query('select * from Products AS t1 INNER JOIN Users AS t2 ON t1.uid=t2.id;', function(err, result){
        if(err){
            console.log("listing error : " + err);
            res.json(response)
            return
        }
    	// /console.log(result);
    	res.json(result)
    	return
	})
    return
})

module.exports = router;