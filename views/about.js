$( document ).ready(function()
{
	ajaxCheckLogin();

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