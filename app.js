var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var expressvalidator=require('express-validator');
var mongojs=require('mongojs');
var db=mongojs('customerapp',['users']);
var ObjectId=mongojs.ObjectId;
var app=express();
//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended:false}));

//set static path
app.use(express.static(path.join(__dirname,'public')));


app.post('/add_data',function(req,res)
{
console.log('form submitted');
	//console.log(req.body.f_name);
	var newUser = {
		first_name:req.body.f_name,
		last_name:req.body.mobile_no,
		email:req.body.email
	}
	db.users.insert(newUser,function(err,result){
		if(err)
		{
			console.log(err);
		}		
		res.redirect('/');
	})
	//console.log(newUser);
});
app.get('/',function(req,res){
	db.users.find(function (err, docs) {
			res.render('index', {
			title: 'customers',
			users:docs
		});	
	});
});
app.delete('/users/delete/:id', function (req, res) {
	
	db.users.remove({_id: ObjectId(req.params.id)},function(err,result){
	if(err){
		console.log(err);
	}
	res.redirect('/');
	});
});
app.listen(3000,function(){
	console.log('server is started on port no 3000');
});