$( document ).ready(function()
{
	ajaxCheckLogin();
	$("#formReg").submit(function(event)
	{
		event.preventDefault();
		ajaxPost();
	})

	function ajaxPost() 
	{
		var formData = {
			username : document.getElementById("username").value,
			firstName : document.getElementById("firstName").value,
			secondName : document.getElementById("secondName").value,
			password : document.getElementById("password").value
		}

		$.ajax({
			type : "POST",
			url : "/register",
			data : formData,
			success : function(data)
			{
				if(data == "exists")
				{
					alert("Username already taken");
				}
				else
				{
					window.location.replace("/");
				}
			}
		});
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

