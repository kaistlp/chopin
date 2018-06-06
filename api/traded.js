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

module.exports = router;