var PSX = {};

var loadAppFiles = function(tabId, scripts, callBack) {
	var obj = {
		count : 0,
		load : function(scripts){
			var scope = this;
			var ext = scripts[scope.count].split('.');
				ext = ext[(ext.length-1)];
			if(ext == 'css') {
				chrome.tabs.insertCSS(tabId, { file: scripts[scope.count] }, function() {					
					scope.count++;
					if(scope.count == scripts.length) {	
						if(callBack) {
							callBack();
						}
					}else{
						scope.load(scripts);
					}
				});
			} else if(ext == 'js') {
				chrome.tabs.executeScript(tabId, { file: scripts[scope.count] }, function() {
					scope.count++;
					if(scope.count == scripts.length) {	
						if(callBack) {
							callBack();
						}		
					}else{
						scope.load(scripts);
					}
				});
			}
		}
	}
	obj.load(scripts); 
}




PSX.loadApp = function(url) {
	
	if(PSX.AppWindowId) {
		PSX.CurrentUrl = url;
		chrome.tabs.sendMessage(PSX.AppTabId, { 'update_data' : url }, function() {});
		//chrome.windows.remove(PSX.AppWindowId, function(){});
		//chrome.windows.update(PSX.AppWindowId, { focused : true, drawAttention : true }, function(){ });			
	}else{

		PSX.CurrentUrl = url;
	    chrome.tabs.create({
	        url: chrome.extension.getURL('app.html'),
	        active: false
	    }, function(tab) {
			
			PSX.AppTabId = tab.id;

			console.log(tab)

	        // After the tab has been created, open a window to inject the tab
	        chrome.windows.create({
	            tabId: tab.id,
	            type: 'panel',
	            focused: false,
	            width: 400,
	            left: (tab.width+300)
	        }, function(win) {
	        	PSX.AppWindowId = win.id;
				chrome.tabs.sendMessage(PSX.AppTabId, { 'update_data' : url }, function() {

				});
			
				//chrome.windows.update(win.id, { focused : false, drawAttention : false }, function(){ });	

	        });
	    });
	}

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.command) {		
		if(request.command == 'loadapp') {
			if(PSX.CurrentUrl != request.url) {		
				PSX.loadApp(request.url);
			}
		}
	}
});

PSX.CurrentWindow = {};

//event when a tab is selected
chrome.tabs.onActivated.addListener(function(result) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    	if(tabs[0].windowId != PSX.AppWindowId && 
    		!tabs[0].url.match(/chrome-devtools:/) && 
    		!tabs[0].url.match(/chrome:\/\/extensions\//) &&
    		!tabs[0].url.match(/chrome-extension:/) &&
    		tabs[0].url != 'chrome://newtab/') {

			PSX.CurrentTab = tabs[0].id;

				var url = tabs[0].url.split('#');
					url = url[0];

			if(PSX.CurrentUrl != url) {		
	    		PSX.loadApp(url);
	    	}
    	}
	});
});


//evenet when window is selected
chrome.windows.onFocusChanged.addListener(function(result) {
    chrome.tabs.query({highlighted: true, currentWindow: true}, function(tabs) {

    	if(result != PSX.AppWindowId && 
    		!tabs[0].url.match(/chrome-devtools:/) && 
    		!tabs[0].url.match(/chrome:\/\/extensions\//) &&
    		!tabs[0].url.match(/chrome-extension:/) &&
    		tabs[0].url != 'chrome://newtab/') {

			var url = tabs[0].url.split('#');
				url = url[0];

			if(PSX.CurrentUrl != url) {		
				PSX.loadApp(url);
	    	}
    	}

	});
});



chrome.windows.onRemoved.addListener(function(result) {
	if(PSX.AppWindowId === result) {
		delete PSX.AppWindowId;
	}
})


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	console.log(tab);

	if(tab.status == "complete" && tab.favIconUrl == undefined) {

	}

});



