var express = require('express');
var mysql = require('mysql');
var util = require("util");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'public',
  password : 'kaistlp',
//  port     : 22,
  database : 'test_db'
});

var router = express.Router();

router.get('/login/:username/:password', (req, res) => {
    var username = req.params.username;
    var password = req.params.password;
    var sess = req.session;
    console.log("Login request");

    
    conection.query('SELECT * FROM Users WHERE name = "%s";', username, function(err, result){
        var response = {};
        if(err){
            console.log("signin error : " + err);
            response["success"] = "false";
            response["error"] = "internal login server error!!";
            res.json(response);
            return
        }
        else {
            if(result.length == 0){
                response["success"] = "false";
                response["error"] = "ID not found";
                res.json(response);
                return;
            }
            var pw_db = result[0].pw;
            if(pw_db == pw){
                console.log("login success")
                response["success"] = "true"
                response["error"] = "";
                res.json(response);
                return;
            }
            else{
                response["success"] = "false";
                response["error"] = "Password not match";
                res.json(response);
                return;
            }

        }

    });
    
});
//login complete;





module.exports = router;
