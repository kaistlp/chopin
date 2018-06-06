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

router.get('/login/:username/:userpw', (req, res) => {
    var user_name = req.params.username;
    var user_pw = req.params.userpw;
    var sess = req.session;
    console.log("Login request");
    console.log('select * from Users where email = "' + user_name + '";');
    
    connection.query('select * from Users where uname = "' + user_name + '";', function(err, result){
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
                response["error"] = "ID not found";
                res.json(response);
                return;
            }
            var pw_db = result[0].pw;
            if(pw_db == user_pw){
                console.log("login success")
                response["success"] = "true"
                response["error"] = "";
                sess.username = user_name;
                sess.userid = result[0].id;
                //console.log("session info : " + sess.username);
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

router.get('/logout', (req, res) => {
    var sess = req.session;
    console.log("Logout request arrived");
    req.session.destroy(function(err){
        
    });
    res.json({"success":"true"});
    return;
});
//logout complete;

router.post('/signup/:username/:password/:phone', (req, res) => {
    var username = req.params.username;
    var password = req.params.password;
    var phonenum = req.params.phone;
    console.log("Signup request arrived");

    connection.query('INSERT INTO Users(name, pw, phone_num) VALUES ("' + username + '", "' + password + '", "' + phonenum + '");', function(err, result){
        var response = {};
        if (!err) {
            console.log("signup success!!");
            response["success"] = "true";
            response["error"] = "";
            res.json(response);
        } else {
            console.log(err)
            response["success"] = "false";
            response["error"] = "Internal signup server error!";
            res.json(response);
        }
    });
});
//signup complete;





module.exports = router;
