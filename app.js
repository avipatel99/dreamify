{
	const express = require('express');
	const parseurl = require('parseurl');
	const bodyParser = require('body-parser');
	const path = require('path');
	const expressValidator = require('express-validator');
	const session = require('express-session');
	const app = express();
	var cons = require('consolidate');
	var JSAlert = require("js-alert");

	var fs = require('fs');
	var data = fs.readFileSync('db.json');
	var db = JSON.parse(data);

	app.engine('html', cons.swig)
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'html');

	app.use(express.static('views'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended:false
	}));
	var jsonParser = bodyParser.json()
	var urlencodedParser = bodyParser.urlencoded({extended:true});
	app.use(expressValidator());

	var loggedIn = false;

	app.use(session({
		secret: 'concertina',
		resave: false,
		saveUnitialized: true
	}));

	app.get('/', function(req, res){
		res.render('home')
	});

	app.get('/register', function(req, res){
		res.render('register')
	});

	app.get('/login', function(req, res){
		res.render('login')
	});

	app.get('/about', function(req, res){
		res.render('about')
	})

	app.get('/mydreams', function(req, res){
		if(loggedIn == true)
		{
			res.render('mydreams');
		}
		else
		{
			res.render('register');
		}
	})





	app.post('/register', function(req, res)
	{
		if(checkUsername(req.body.username))
		{
			return res.send("exists");
		}
		else
		{
			//res.send("accepted");
			db.users.push({"username" : req.body.username, "forename" : req.body.firstName, "surname" : req.body.secondName, "password" : req.body.password});
			var data = JSON.stringify(db, null, 2);
			fs.writeFile('db.json', data, finished);
			res.redirect('/');
			//return res.send("accepted")
		}
	})

	app.post('/newDream', function(req, res)
	{
		if(loggedIn == true)
		{
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; 
			var yyyy = today.getFullYear();
			if (dd < 10)
			{
			  dd = '0' + dd;
			}
			if (mm < 10) 
			{
			  mm = '0' + mm;
			}
			today = dd + '/' + mm + '/' + yyyy;

			db.dreams.push({"title" : req.body.title, "dreamContent" : req.body.dreamContent, "username" : req.session.username, "date" :today});
			var data = JSON.stringify(db, null, 2);
			fs.writeFile('db.json', data, finished);
			return res.send("success");
		}
		else
		{
			return res.send("fail")
		}
	})

	function finished(err){}

	function checkUsername(name)
	{
		var x = false;
		for (var index in db.users)
		{
			var user = db.users[index];
			if(user["username"] == name)
			{
				x = true;
				break;
			}
		}
		return x;
	}



	app.post('/login', function(req, res){
		u = getUser("username", req.body.username);
		if(u != null)
		{
			if (u["password"] == req.body.password)
			{
				loggedIn = true;
				req.session.username = req.body.username;
				return res.send("success");
			}
			else
			{
				return res.send("rejected");
				// res.render('login');
			}
		}
		else
		{
			return res.send("rejected");
		}
	})

	function getUser(key, value)
	{
		for (var index in db.users)
		{
			var user = db.users[index];
			var compare = user[key];
			if (compare == value)
			{
				return user;
				break;
			}
		}
	}

	function getDream(key, value)
	{
		var returnDreams = []
		for (var index in db.dreams)
		{
			var dream = db.dreams[index];
			var compare = dream[key];
			if (compare == value)
			{
				returnDreams.push(dream);
			}
		}
		return returnDreams;
	}

	app.get('/getMyDreams', function(req, res)
	{
		lst = getDream("username", req.session.username);
		console.log(lst);
		return res.send(lst);
	})

	app.get('/checkLoggedIn', function(req, res)
	{
		if(loggedIn)
		{
			return res.send("loggedIn");
		}
		else
		{
			return res.send("notLoggedIn");
		}
	})

	app.get('/logout', function(req, res)
	{
		req.session.destroy();
		loggedIn = false;
		return res.send("logoutSuccess");
	})

	app.get('/people', function(req, res)
	{
		// res.send(200);
		res.send(db.users);
	})

	app.get('/people/doctorwhocomposer', function(req,res)
	{
		dctr = getUser("username", "doctorwhocomposer");
		res.send(dctr);
	})

	app.post('/people', function(req, res)
	{
		if(req.body.access_token != "concertina")
		{
			res.send(403);
		}
		else
		{
			if(checkUsername(req.body.username))
			{
				res.send(400);
			}
		}
	})

	module.exports = app;

}