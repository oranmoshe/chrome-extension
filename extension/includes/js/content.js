
function getCounter(){
	var xhr = new XMLHttpRequest;
	xhr.open("GET", chrome.runtime.getURL("words.json"));
	xhr.onreadystatechange = function() {
	var counter = 0;
	  if (this.readyState == 4) {
	    console.log("request finished, now parsing");
	    window.json_text = xhr.responseText;
	    window.parsed_json = JSON.parse(xhr.responseText);
	    $.each( window.parsed_json, function( key, val ) {			
			counter += ($("body").text().match(val.word) || []).length;
			console.log('word: '+ val.word + ' , counter: ' + ($("body").text().match(val.word) || []).length);
	    });
	  }
	  return counter;
	};
	xhr.send();
}


function lightWords(){
	var xhr = new XMLHttpRequest;
	xhr.open("GET", chrome.runtime.getURL("words.json"));
	xhr.onreadystatechange = function() {
	  if (this.readyState == 4) {
	    console.log("request finished, now parsing");
	    window.json_text = xhr.responseText;
	    window.parsed_json = JSON.parse(xhr.responseText);
      var offensive_counter = 0;
	    $.each( window.parsed_json, function( key, val ) {
  	 		$("body *").replaceText(val.word, '<a href=\"https://he.wikipedia.org/wiki/%D7%90%D7%9C%D7%99%D7%9E%D7%95%D7%AA_%D7%A0%D7%92%D7%93_%D7%A0%D7%A9%D7%99%D7%9D\" style="color: red;">'+val.word+'</a>', function(data){
  	 			offensive_counter+=data;
  	 		});	 	
	    });
	    console.log(offensive_counter);
      chrome.runtime.sendMessage({offensive_counter: String(offensive_counter)}, function(response) {});
	  }
	};
	xhr.send();
	
}
$(document).ready(function(){
$(window).bind('load', function(){
	setTimeout(function(){
		//console.log();
		var a = $('body iframe')[0].outerHTML;
		$(a).hide();
	}, 10000)
   
});

	lightWords(); 
   //  $('body').css("display","none");
   // alert($('iframe').html());
});


	
