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
        // /console.log(result);
        res.json(result)
        return;
    })
    return;
})

module.exports = router;