var express    = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'public',
  password : 'kaistlp',
//  port     : 22,
  database : 'test_db'
});

module.exports = function(app)
{
	app.get('/',function(req,res){
		res.render('index.html')
	});
	app.get('/about',function(req,res){
		res.render('about.html');
	});
	app.get('/signin',function(req,res){
		res.render('signin.html');





		

	});

	app.get('/persons', function(req, res){
		
		
		
		connection.query('select * from persons', function(err, rows) {
			if(err) throw err;

			console.log('the solution is : ', rows);
			res.send(rows);
		});
		
	});
	app.get('/register',function(req,res){
		res.render('product_register.html');
	});
	app.get('/all',function(req,res){

		connection.query('select * from persons', function (err,rows){
			if(err) throw err;
			console.log('the solution is : ', rows);
			res.send(rows);


		});
		
	});
	

}
