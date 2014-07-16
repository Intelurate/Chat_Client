$(function() {
	
	//var domain = "http://flock.ethamatics.com/";
	//var socket = io.connect('ws://flock.ethamatics.com/');

	//var domain = "http://localhost:8000/";
	var socket = io.connect('ws://app.pageswarm.com/');

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
		if($('body').attr('swarm') != 'searched') {
			$('body').attr('swarm', 'searched');			
			for(var a = 0; a<urls.length; a++) {
				var googLink = $(searchRecords[a]);	
				googLink.find('.rc h3').prepend('<div class="googleSearchStat"><img src="'+chrome.extension.getURL("/images/icon.png")+'" width="16" /><p>'+urls[a].count+'</p></div>');
			}
		}
	});

});
