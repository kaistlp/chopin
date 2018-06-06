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
    console.log("View Traded Log");
    console.log(req.query);
    var keyword = req.query.keyword;
    var type = req.query.type;
    var order = req.query.order;
    console.log('Keyword: ' + keyword+", type="+type+", order="+order);
    var response = {};
    var sql_query = 'select t.pid, pname, final_price, u1.uname as seller_name, u2.uname as buyer_name from Trades as t '
    +'Inner Join Users as u1 on t.seller_id=u1.id '
    +'Inner Join Users as u2 on t.buyer_id=u2.id '
    +'Inner Join Products as p on t.pid=p.pid';
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
      response["success"] = "false";
      response["error"] = "DB error, there aren't that product";
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