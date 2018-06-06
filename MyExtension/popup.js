$(document).ready(function(){
	$("#confirm").on("click", function(){
		chrome.tabs.create({"url": "http://trollface.dk/"})
	})
});
