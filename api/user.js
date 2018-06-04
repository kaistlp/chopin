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

router.get('/login/:useremail/:userpw', (req, res) => {
    var user_email = req.params.useremail;
    var user_pw = req.params.userpw;
    var sess = req.session;
    console.log("Login request");
    console.log('select * from Users where email = "' + user_email + '";');
    
    connection.query('select * from Users where email = "' + user_email + '";', function(err, result){
        var response = {};
        if(err){
            console.log("signin error : " + err);
            response["success"] = "false";
            response["error"] = "internal login server error!!";
            res.json(response);
            return
        }
        else {
            console.log(result);
            //console.log("output data : " + data)
            if(result.length == 0){
                response["success"] = "false";
                response["error"] = "Email not found";
                res.json(response);
                return;
            }
            var pw_db = result[0].pw;
            if(pw_db == user_pw){
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
