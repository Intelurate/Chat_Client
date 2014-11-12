


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {


	if(request.check_updates) {
		window.PS.Views.AppView.checkUpdates();
	}

	if(request.toggle_lock) {
		window.PS.Views.AppView.toggleLock();
	}

});
