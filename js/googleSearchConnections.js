$(function() {
	
	//var domain = "http://flock.ethamatics.com/";
	//var socket = io.connect('ws://flock.ethamatics.com/');

	var domain = "http://localhost:8000/";
	var socket = io.connect('ws://localhost:8000/');

	var searchRecords = $('body').find('li.g');
	var urls = [];

	for(var a = 0; a<searchRecords.length; a++) {
		var url = $(searchRecords[a]).find('h3 a').attr('href');
		if(url) {
			urls.push({ room : MD5(url.toString()) });
		}
	}

	socket.emit('geturlconnections', urls);
	socket.on('showurlconnections', function (urls) {
		for(var a = 0; a<urls.length; a++) {
			var googLink = $(searchRecords[a]);	
			googLink.find('.rc h3').append('<div style="font-size:12px;width:50%;padding:3px;border:1px solid #999;">'+urls[a].count+' live connections <img src="'+chrome.extension.getURL("/images/active_status.png")+'"/></div>');
		}
	});

});