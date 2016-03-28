(function($){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

	$mouseover = $('.mouse-over');
	$click     = $('.click');
	$sub       = $('.submit');


	$mouseover.mouseover(function() {
		//$("#mouse-over") = $("#mouse-over");
		$(this).html("Scrooge McDuck!");
		$(this).height($(this).height() + 50);
	});

	$click.click(function() {
		$(this).html('Peace Out!')
		$(this).fadeOut(1500);
		return false;
	});

	$sub.on('submit', function(e) {
		e.preventDefault();
		if ($(this).find('input[type="text"]').val() !== '') {
			$(this).find('input').each(function() {
				$(this).fadeOut('slow');
			});
			$(this).append("<h2>Congratulations! You've entered some text!</h2>");
		}
	});

	$(document).ready( function() {
		//original code has a fadeIn() call so I decided to hide it before hand so I can see that it works
		$(".timeout").hide();
		setTimeout(function (){
			$(".timeout").fadeIn("slow");
		}, 1000);
		console.log(document.cookie)
		if (document.cookie.length>0){
			var cook = document.cookie.split("=")[1];
			$(".hidden_title").append("<p>your last selection was " + cook + "</p>");
			console.log(document.cookie)
			document.cookie = "";
		}
	});


	function get_title(){
		$(".button_text").html('Change It');
		var data = $.ajax({
			type: 'GET',
	        url: 'http://www.mattbowytz.com/simple_api.json?data=quizData',
	        async: false,
	        data: '{}',
	        dataType: 'json'
	    	}).responseText;
		data = JSON.parse(data)["data"]

		var random_value = Math.floor(Math.random() * (data.length));

		var add_button = "<button"

		$("#list").html("<li>"+data[random_value]+"</li>");
		$(".hidden_button").html("<button onclick = " + '"' + "document.cookie = 'cookie=' + " + "'" + data[random_value]+ "'" + "; location.reload();" + '"'+" type= " + '"' + "button" + '"' + ">Keep It!</button>");
		console.log("<button onclick = " + '"' + "document.cookie = 'cookie=' + " + "'" + data[random_value]+ "'" + "; location.reload();" + '"'+" type= " + '"' + "button" + '"' + ">Keep It!</button>");
	}

	$(".button").click(get_title);

})(jQuery);