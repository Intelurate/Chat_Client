if(!window.PS) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(request.action) {
			if(request.action == "checkApp") {
				if(window.PS ) {
					sendResponse({ exist : true });
				} else {
					sendResponse({ exist : false });
				}				
			}
		}
	});
}