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
    var sql_query = 'select pid, pname, max_price, init_price, is_sold, t1.reg_time, uname from Products AS t1 INNER JOIN Users AS t2 ON t1.uid=t2.id';
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
  console.log('select pname, value from Products inner join Descriptions on Products.pid = Descriptions.pid where Products.pid = ' + pid + ' and Descriptions.name = "description";');

  connection.query('select Products.pname, Products.uid, Descriptions.value from Products inner join Descriptions on Products.pid = Descriptions.pid where Products.pid = ' + pid + ' and Descriptions.name = "description";', function(err, result){
    var response = {};
    console.log(result);
    if(result.length == 0){
      respons["success"] = "false";
      respons["error"] = "DB error, there aren't that product";
      res.json(response);
      return;
    }
    response["sessid"] = sess.userid;
    response["sellid"] = result[0].uid;
    response["pname"] = result[0].pname;
    response["description"] = result[0].value;
    response["success"] = "true";
    response["error"] = "";
    connection.query('select Users.uname, Demands.offer_price, Demands.reg_time from Demands inner join Users on Users.id = Demands.uid where Demands.pid = ' + pid + ' order by Demands.offer_price desc;', function(err, tables){
      console.log(tables);
      response["demands"] = tables;
      res.json(response);
      return;
    })

  })

})

module.exports = router;