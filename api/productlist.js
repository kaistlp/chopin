var express = require('express');
var mysql = require('mysql');
var util = require("util");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'public',
    password: 'kaistlp',
    //  port     : 22,
    database: 'sad_db'
});

var router = express.Router();

router.get('/all', (req, res) => {
    console.log("View Product");
    console.log(req.query);
    var keyword = req.query.keyword;
    var type = req.query.type;
    var order = req.query.order;
    console.log('Keyword: ' + keyword+", type="+type+", order="+order);
    var response = {};
    var sql_query = 'select result1.pid, pname, max_price, init_price, is_sold, reg_time, uname, current_price from (select pid, pname, max_price, init_price, is_sold, t1.reg_time, uname from Products AS t1 INNER JOIN Users AS t2 ON t1.uid=t2.id) as result1 LEFT Join (select pid, max(offer_price) as current_price from Demands group by Demands.pid) as result2 on result1.pid=result2.pid';
    if (keyword !== undefined) {
        sql_query = sql_query + ' where pname like "%' + keyword + '%"';
    }
    if (type !== undefined) {
      sql_query = sql_query + ' order by ' + type + ' '+order;
    }
    sql_query = sql_query + ";";
    console.log(sql_query);
    connection.query(sql_query, function(err, result) {
        if (err) {
            console.log("listing error : " + err);
            res.json(response)
            return;
        }
        res.json(result)
        return;
    })
    return;
})


router.get('/info/:pid', (req, res) => {
  var pid = req.params.pid;
  var sess = req.session;
  console.log('find product info');
  var sql_query = ' select Products.pname, Products.uid, Users.uname, Users.phone_num, Products.is_sold, Products.init_price, Descriptions.name, Descriptions.value from Descriptions'
  + ' inner join Products on Products.pid = Descriptions.pid'
  + ' inner join Users on Products.uid = Users.id'
  + ' where Products.pid = ' + pid +';';
  console.log(sql_query);

  connection.query(sql_query, function(err, result){
    var response = {};
    console.log(result);
    if(result.length == 0){
      response["success"] = "false";
      response["error"] = "DB error, there aren't that product";
      res.json(response);
      return;
    }
    response["sessid"] = sess.userid;
    response["all_data"] = result;
    // response["description"] = result[0].value;
    response["success"] = "true";
    response["error"] = "";
    connection.query('select Demands.uid, Users.uname, Users.phone_num, Demands.offer_price, Demands.reg_time from Demands inner join Users on Users.id = Demands.uid where Demands.pid = ' + pid + ' order by Demands.offer_price desc;', function(err, tables){
      console.log(tables);
      response["demands"] = tables;
      res.json(response);
      return;
    })

  })

})


router.get('/buy/:pid/:price', (req, res) => {
  var pid = req.params.pid;
  var offer_price = req.params.price;
  var uid = req.session.userid;
  var reg_time = "";
  var d = new Date()
  var time = d.toUTCString()

  console.log('buy request, regist demands');

  connection.query('insert into Demands values(' + uid + ', ' + pid + ', ' + offer_price + ', "' + time
   + '") on duplicate key update uid = ' + uid + ', pid = ' + pid + ', offer_price = ' + offer_price
    + ', reg_time = "' + time +'";', function(err, result){
    var response = {};
    if(!err){
      console.log('buy require success!!!');
      response["success"] = "true";
      response["error"] = "";
      res.json(response);
    }
    else {
      console.log(err);
      response["success"] = "false";
      response["error"] = "Internal buy request server error!";
      res.json(response); 
    }
  })
})


router.get('/confirm/:pid/:buyername/:price', (req, res) => {
  var pid = req.params.pid;
  var buyername = req.params.buyername;
  var sellerid = req.session.userid;
  var finalprice = req.params.price;

  console.log('confirm request, regist Trades, update Products');
  connection.query('select * from Users where Users.uname="'+ buyername + '";', function(err, result){
    var buyerid = result[0]['id']
    connection.query('insert into Trades values (' + sellerid + ', ' + buyerid + ', ' + pid + ', ' + finalprice + ');', function(err, result) {
      var response = {};
      if(err){
        console.log('insert to Trades : ' + err);
        response["success"] = "false";
        response["error"] = "Internal confirm request server error!";
        res.json(response);
      }
      else{
        console.log('confirm require : adding to Trades success');
        connection.query('update Products set is_sold = "Y" where pid = ' + pid + ';', function(err, result) {
          if(err){
            console.log('update Products : ' + err);
            response["success"] = "false";
            response["error"] = "Internal confirm request server error!";
            connection.query('delete from Trades where seller_id = ' + sellerid + ' and buyer_id = ' + buyerid + ' and pid = ' + pid + ');')
            res.json(response);
          }
          else{
            console.log('confirm request success!!!');
            response["success"] = "true";
            response["error"] = "";
            res.json(response);
          }
        })
      }
    })
  })
})


module.exports = router;