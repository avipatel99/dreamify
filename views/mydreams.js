$( document ).ready(function()
{

	ajaxGet();
	ajaxCheckLogin();

	function ajaxGet()
	{	
		$.ajax(
		{
			type:"GET",
			url:"/getMyDreams",
			success : function(data)
			{
				for (var i = 0; i<data.length; i++) 
				{
					$("#divID").append('<div class = "col-md-9"><a href="#' + data[i].title + '">' + data[i].title + '</a></div><div class="col-md-3 date">' + data[i].date + '</div>');
					$("#contentID").append('<hr><article><a id="' + data[i].title + '"><header><h2>' + data[i].title + '</h2></header><footer><small>' + data[i].date + '</small></footer><div class="lead">' + data[i].dreamContent +  '</a></div></article>');
				}
			}
		})
	}


	function ajaxCheckLogin()
	{	
		$.ajax(
		{
			type:"GET",
			url:"/checkLoggedIn",
			success : function(data)
			{
				if(data == "loggedIn")
				{
					// $("#navbarNav").append('<button class="logout">Logout</button>');
					$("#logID").html('<a class="nav-link navbar-right logout" href="#">Logout</a>')
				}
				else
				{
					window.location.replace("/register");
					alert("Please login or create an account to view your dreams");
					$("#logID").html('<a class="nav-link navbar-right" href="login.html">Login</a>')
				}
			}
		})
	}

	function ajaxCheckLogin2()
	{	
		$.ajax(
		{
			type:"GET",
			url:"/checkLoggedIn",
			success : function(data)
			{
				if(data == "loggedIn")
				{
					// $("#navbarNav").append('<button class="logout">Logout</button>');
					$("#logID").html('<a class="nav-link navbar-right logout" href="#">Logout</a>')
				}
				else
				{
					$("#logID").html('<a class="nav-link navbar-right" href="login.html">Login</a>')
				}
			}
		})
	}

	$(document).on("click",".logout", function(event)
	{
		event.preventDefault();
		ajaxLogout();
	})

	function ajaxLogout()
	{
		$.ajax(
		{
			type:"GET",
			url:"/logout",
			success : function(data)
			{
				alert("Successfully logged out");
				ajaxCheckLogin2();
				window.location.replace("/");
			}
		})
	}
})