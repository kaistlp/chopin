var express    = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'public',
  password : 'kaistlp',
//  port     : 22,
  database : 'sad_db'
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
	app.get('/product',function(req,res){
		res.render('product.html');
	});
	app.get('/upload',function(req,res){
		res.render('upload.html');
	});
	app.get('/product_info',function(req,res){
		res.render('product_info.html');
	});
	app.get('/mypage',function(req,res){
		res.render('mypage.html');
	});
}
