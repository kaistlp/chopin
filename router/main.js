var express    = require('express');
var router 	   = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'public',
  password : 'kaistlp',
//  port     : 22,
  database : 'sad_db'
});

router.get('/',function(req,res){
	var sess = req.session;
	if(sess.username === undefined){
		res.render('index.html', {
			name : sess.username,
			id : sess.userid
		})
	}
});
router.get('/about',function(req,res){
	res.render('about.html');
});
router.get('/signin',function(req,res){
	var sess = req.session;
	if(!(sess.username === undefined)){
		console.log("already logined");
		res.redirect('/');
		return;
	}
	res.render('signin.html');
});
router.get('/signup',function(req,res){
	res.render('signup.html');
});
router.get('/persons', function(req, res){
	connection.query('select * from persons', function(err, rows) {
	if(err) throw err;
		console.log('the solution is : ', rows);
		res.send(rows);
	});
});
router.get('/product',function(req,res){
	res.render('product.html');
});
router.get('/upload',function(req,res){
	res.render('upload.html');
});
router.get('/product_info',function(req,res){
	res.render('product_info.html');
});
router.get('/mypage',function(req,res){
	res.render('mypage.html');
});

module.exports = router;
