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
router.get('/product', (req, res) => {
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

router.get('/request', (req, res) => {
  var response = {}
  var sess = req.session;
  if (!(sess.username===undefined)){
    connection.query('select t1.uname,pname,Products.pid,is_sold,offer_price From Products INNER JOIN Users As t1 On Products.uid=t1.id INNER JOIN Demands As t2 On Products.pid=t2.pid where t2.uid In (SELECT id from Users where uname="'+sess.username+'");', function(err, result){
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