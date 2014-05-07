
var tabObjs = {};
var startClick = false;

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


var pageLoadTime = 0;

chrome.browserAction.onClicked.addListener(function(tab, loadingLoop) {

	chrome.tabs.executeScript(tab.id,{"code": "window.stop();"});

	var tabHashed = MD5(tab.id.toString());

	if(startClick == false || loadingLoop == true) {

		if(tab.status == "complete") {

			if(tabObjs[tabHashed]) {
				if(tabObjs[tabHashed].status == "loaded") {
					tabObjs[tabHashed].status = "removed";			
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					  	chrome.tabs.sendMessage(tab.id, { chatid: tabHashed, action : "hidechat" }, function(response) {			
					  	});
					});
				} else if(tabObjs[tabHashed].status == "removed") {
					tabObjs[tabHashed].status = "loaded";	
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					  	chrome.tabs.sendMessage(tab.id, { chatid: tabHashed, action : "showchat" }, function(response) {
					  	});
					});
				}
			} else {
				tabObjs[tabHashed] = {};
				tabObjs[tabHashed].url = tab.url;

				startClick = false;
				loadAppFiles(tab.id, [
					'css/styles.css', 
					'js/jquery.js', 
					'js/underscore.js', 
					'js/backbone.js', 
					'js/icanhaz.js', 
					'js/socketio.js', 
					'js/md5.js', 
					'js/templates.js', 					
					'js/viewModels/headerViewModel.js',
					'js/viewModels/contentViewModel.js',
					'js/viewModels/appViewModel.js',
					'js/viewModels/statusViewModel.js',
					'js/chat.js'], 
					function() {
						tabObjs[tabHashed].status = "loaded";
						pageLoadTime = 0;
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						  	chrome.tabs.sendMessage(tab.id, { chatid: tabHashed, action : "loadchat" }, function(response) {});
					});					
				});				
			}	
		} else {

			console.log('loading...');
		
			if(startClick == false && loadingLoop == undefined) {
				startClick = true;
				console.log('App will load after web page loads.');
			}

			setTimeout(function() {		
				chrome.tabs.getSelected(null, function(tab) {
					chrome.browserAction.onClicked.dispatch(tab, true);
				});	
			}, 500);
		}
	}
});


chrome.tabs.onCreated.addListener(function(tab) {
	//console.log(tab)
});


chrome.tabs.onRemoved.addListener(function(tabId, tab) {
	var tabHashed = MD5(tabId.toString());
	if(tabObjs[tabHashed]) {
		delete tabObjs[tabHashed];
	}
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	var onGoogle = false;
	var googleQueryExist = tab.url.indexOf("search?");
	if(googleQueryExist != -1) {
		var googleUrl = tab.url.split("search?")[0];
		if(googleUrl == 'https://www.google.com/' &&
			tab.favIconUrl != undefined &&
			tab.status == "complete") {	

				loadAppFiles(tab.id, [					
					'js/jquery.js', 
					'js/socketio.js', 
					'js/md5.js', 
					'js/googleSearchConnections.js'], function(){});	
		
			onGoogle = true;
		}
	}	

	if(onGoogle == false) {
	
		var hashExist = tab.url.indexOf("#");
		var tabHashed = MD5(tabId.toString());
		if(tabObjs[tabHashed]) {
			if(changeInfo.status == "complete") {
				
				if(hashExist != -1) {
					var hash1 = tabObjs[tabHashed].url.split("#")[1]; 
					var hash2 = tab.url.split("#")[1];

					console.log(hash1);
					console.log(hash2);
					
					if(hash1 == hash2) {
						console.log('sweet')
						delete tabObjs[tabHashed];
					}else{
						console.log('neeat')
						tabObjs[tabHashed].url = tab.url;
					}
				}else{
					delete tabObjs[tabHashed];
				}	
			}
		}
	}
});
