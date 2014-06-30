if(!window.chatApp) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

		if(request.action) {

			if(request.action == "hidechat") {				
				chrome.storage.sync.set({'chatAppState': "Hidden" }, function(){});
				$('body').find('.page_swarm').hide();
			} else if(request.action == "showchat") {				
				chrome.storage.sync.set({'chatAppState': "Max" }, function(){});			
				$('body').find('.page_swarm').show();	
				if($('.page_swarm').hasClass('minimized')) {
					$('.page_swarm').removeClass('minimized');
				}
			}

			if(request.action == "chatloaded") {
				chrome.storage.sync.get('chatAppState', function(result) {
					if(result.chatAppState) {
						if(result.chatAppState == "Hidden") {						
							sendResponse('hidden');
						} else {
							sendResponse('displayed');
						}
					}
				});

				return true;
			}
		
			if(request.action == "checkApp") {
				if(window.chatApp ) {
					sendResponse({ exist : true });
					window.chatApp.reRender();
				} else {
					sendResponse({ exist : false });
				}				
			}
		}
	});
}