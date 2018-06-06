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
router.get('/', (req, res) => {
	console.log("My Page");
	var response = {}
	var sess = req.session;
	if (!(sess.username===undefined)){
		connection.query('select * from Products AS t1 Right JOIN Users AS t2 ON t1.uid=t2.id  where uname="'+sess.username+'";', function(err, result){
        if(err){
            console.log("listing error : " + err);
            res.json(response)
            return
        }
    	console.log(result);

    	console.log(sess.username);
      res.json(result)
    	return
	})

	}
	else{
		console.log("WHAT")
		res.json(response)
		return
	}
    return
})
module.exports = router;