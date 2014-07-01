


var startClick = false;

var username = null;

chrome.chatApp = { username : "Eddie" };

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


window.tabObjs = {};

/*

chrome.browserAction.onClicked.addListener(function(tab) {

	var tabHashed = "__"+MD5(tab.id.toString())+"__";

	if(!tabObjs[tabHashed]) {
		tabObjs[tabHashed] = {};
		tabObjs[tabHashed].appStatus = "notLoaded";
	}

	console.log(tabObjs[tabHashed].appStatus)
	
	if(tabObjs[tabHashed].appStatus == "notLoaded") {
		
		chrome.tabs.executeScript(tab.id,{"code": "window.stop();"});

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

			window.tabObjs[tabHashed].appStatus = "displayed";
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  	chrome.tabs.sendMessage(tab.id, { action : "chatloaded" }, function(response) {
			  		tabObjs[tabHashed].appStatus = response;
			  	});
			});					
		});	

	} else if(tabObjs[tabHashed].appStatus == "displayed") {

		console.log(tabHashed)

		tabObjs[tabHashed].appStatus = "hidden";

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  	chrome.tabs.sendMessage(tab.id, { action : "hidechat" }, function(response) {			
		  		console.log('shit')
		  	});
		});

	} else if(tabObjs[tabHashed].appStatus == "hidden") {		

		tabObjs[tabHashed].appStatus = "displayed";
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  	chrome.tabs.sendMessage(tab.id, { action : "showchat" }, function(response) {
		  		console.log(response);
		  	});
		});

	}
});

*/


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {


	var onGoogle = false;
	var querys = ['search', 'webhp'];
	for(query in querys) {
		var googleQueryExist = tab.url.indexOf(querys[query] + "?");
		if(googleQueryExist != -1) {		
			var googleUrl = tab.url.split(querys[query] + "?")[0];
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
	}

	if(onGoogle == false) {

		var tabHashed = "__"+MD5(tab.id.toString())+"__";

		if(changeInfo.status == "loading") {
			if(window.tabObjs[tabHashed]) {
				//delete window.tabObjs[tabHashed];
			}
		} 	

		if(changeInfo.status == "complete") {

			if(!window.tabObjs[tabHashed]) {				
				window.tabObjs[tabHashed] = {
					appStatus : "notLoaded"
				};
			}

			loadAppFiles(tab.id, ['js/checkForApp.js'], function() {	
				chrome.tabs.sendMessage(tab.id, { action : "checkApp" }, function(response) {					
					if(response) {							
						if(response.exist == false) {							
							loadAppFiles(tab.id, [
								'css/styles.css', 
								'js/jquery.js', 
								'js/underscore.js', 
								'js/backbone.js', 
								'js/icanhaz.js', 
								'js/socketio.js', 
								'js/md5.js', 
								'js/templates.js',

								'js/viewModels/appViewModel.js',
								'js/viewModels/tabViewModel.js',
								'js/viewModels/discViewModel.js',
								'js/viewModels/userListViewModel.js',

								'js/viewModels/headerViewModel.js',
								'js/viewModels/contentViewModel.js',
								'js/viewModels/statusViewModel.js',
								'js/chat.js'], 

							function() {
								window.tabObjs['__'+tabHashed+'__'].appStatus = "displayed";
								chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
								  	chrome.tabs.sendMessage(tab.id, { action : "chatloaded" }, function(response) {									  		
								  		window.tabObjs["__"+tabHashed+"__"].appStatus = response;
								  	});
								});					
							});	
						}
					}
				});
			});
		}
	
		var hashExist = tab.url.indexOf("#");
		var tabHashed = MD5(tabId.toString());
		if(tabObjs[tabHashed]) {
			if(changeInfo.status == "complete") {
				if(hashExist != -1) {
					var hash1 = tabObjs[tabHashed].url.split("#")[1]; 
					var hash2 = tab.url.split("#")[1];
					
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
