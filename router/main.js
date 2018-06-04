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
	app.get('/product',function(req,res){
		res.render('product.html');
	});
}
