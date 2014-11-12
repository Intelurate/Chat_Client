

$(document).ready(function() {

	var url = document.URL.split('#');
		url = url[0];

	var loadUrl;

	chrome.runtime.sendMessage({ command : 'loadapp', url : url });

	var setTimeoutInt = null;
	$('body').on('click', function(e) {
			
		setTimeoutInt = setTimeout(function() {
			
			var url_updated = document.URL.split('#');
				url_updated = url_updated[0];
			if(loadUrl) {
				if(loadUrl != url_updated) {
					chrome.runtime.sendMessage({ command : 'loadapp', url : url_updated });
					loadUrl = url_updated;
				}		
			}

			clearTimeout(setTimeoutInt);
			
		}, 200)
	});

	if(!loadUrl) {
		loadUrl = url;
	}


	$('body').prepend('<div class="page_swarm_icon"><img src="'+chrome.extension.getURL("images/icon.png")+'" width="40" /></div>');	

});
