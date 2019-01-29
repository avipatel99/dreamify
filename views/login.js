$( document ).ready(function()
{

	ajaxCheckLogin();
	$("#formLogin").submit(function(event)
	{
		event.preventDefault();
		ajaxPost();
	})

	function ajaxPost()
	{
		var formData = 
		{
			username : document.getElementById("username").value,
			password : document.getElementById("password").value
		}

		$.ajax(
		{
			type : "POST",
			url : "/login",
			data : formData,
			success : function(data)
			{
				if (data == "success")
				{
					window.location.replace("/");
				}
				else
				{
					alert("Incorrect Username/Password");
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
				ajaxCheckLogin();
				window.location.replace("/");
			}
		})
	}
})