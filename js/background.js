

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



var removeTab = function(tabId) {
	if(PSX.rooms) {	
		var rooms = _.keys(PSX.rooms);	
		for(room in rooms) {
			if(PSX.rooms[rooms[room]]) {
				if(PSX.rooms[rooms[room]].tabs) {
					var tabs = _.keys(PSX.rooms[rooms[room]].tabs);
					for(tab in tabs) {
						if(PSX.rooms[rooms[room]].tabs[tabs[tab]].id == tabId) {
							delete PSX.rooms[rooms[room]].tabs[tabs[tab]];			
						}
					}
				}
			}
		}			
	}
}



chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	var rooms = _.keys(PSX.rooms);
	for(room in rooms) {
		var room = rooms[room];
		if(PSX.rooms[room]) {	
			if(PSX.rooms[room].tabs[tabId]) {
				var data = { room : room, user : PSX.rooms[room].tabs[tabId].user };														
				delete PSX.rooms[room].tabs[tabId];			
				if( _.keys(PSX.rooms[room].tabs).length < 1) {
					delete PSX.rooms[room];					
					PSX.commands.send('leaveroom', data);
				}
			}
		}
	}
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {


	if(request.command) {		

		if(request.command == 'startconnection') {

			var rooms = _.keys(PSX.rooms);
			var tabId = sender.tab.id;

			for(room in rooms) {
				var room = rooms[room];
				if(PSX.rooms[room]) {	
						
					if(PSX.rooms[room].tabs[tabId]) {

						console.log(PSX.rooms[room].tabs[tabId].id)

						var url = sender.tab.url.split('#');
							url = url[0];
							url = MD5(url);

						var data = { room : room, user : PSX.rooms[room].tabs[tabId].user };	
						delete PSX.rooms[room].tabs[tabId];
						if(url != room) {
							if( _.keys(PSX.rooms[room].tabs).length < 1) {

								delete PSX.rooms[room];				
								PSX.commands.send('leaveroom', data);
							}
						}
					}
				}
			}

			removeTab(sender.tab.id);

		}else if(request.command == 'endconnection') {		
			request.data.rooms = _.keys(PSX.rooms);
		}

		request.data.tabId = sender.tab.id;

		PSX.commands.send(request.command, request.data);

	}
});





chrome.tabs.onActivated.addListener(function(result) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
		chrome.tabs.sendMessage(tabs[0].id, { 'check_updates' : 'true' }, function() {
		});
	});
});

chrome.windows.onFocusChanged.addListener(function(result){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
		chrome.tabs.sendMessage(tabs[0].id, { 'check_updates' : 'true' }, function() {
		});
	});
});



//chrome.storage.local.remove('swarm_tabs');

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, { 'toggle_lock' : 'true' }, function() {

	});
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if(tab.status == "complete" && tab.favIconUrl == undefined) {

	}

});



/*

window.tabObjs = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if(changeInfo.status == "complete") {		

		var onPortal = false;

		var querys = ['search', 'webhp'];
		var googleUrl = '';

		//google links
		for(q in querys) {	
			googleUrl = tab.url.split(querys[q] + "?")[0];	
			if(googleUrl == 'https://www.google.com/') {

				if(tab.status == "complete" && tab.favIconUrl != undefined) {				
					loadAppFiles(tab.id, [					
								'css/google_search.css', 
								'js/jquery.js', 
								'js/socketio.js', 
								'js/md5.js', 
								'js/portals/googleSearchConnections.js'], function(){});
					onPortal = true;
				}else if(tab.status == "complete" && tab.favIconUrl == undefined) {
					chrome.tabs.sendMessage(tab.id, { 'loadUrls' : 'true' }, function() {});
					onPortal = true;
				}

			}
		}

		
		//yahoo portal links
		if(tab.url == 'http://techcrunch.com/' || tab.url == 'http://techcrunch.com/page/2/') {

			if(tab.status == "complete" && tab.favIconUrl != undefined) {				
				loadAppFiles(tab.id, [					
							'css/google_search.css', 
							'js/jquery.js', 
							'js/socketio.js', 
							'js/md5.js', 
							'js/portals/techCrunchConnections.js'], function(){});
				onPortal = true;
			}else if(tab.status == "complete" && tab.favIconUrl == undefined) {
				chrome.tabs.sendMessage(tab.id, { 'loadUrls' : 'true' }, function() {});
				onPortal = true;
			}
		}
	}



	if(onPortal == false) {

		var tabHashed = "__"+MD5(tab.id.toString())+"__";

		if(changeInfo.status == "complete") {

			if(!window.tabObjs[tabHashed]) {
				window.tabObjs[tabHashed] = {
					appStatus : "notLoaded",
					tabId : tab.id
				};
			}

			loadAppFiles(tab.id, ['js/checkForApp.js'], function() {	
				chrome.tabs.sendMessage(tab.id, { action : "checkApp" }, function(response) {					
					if(response) {							
						if(response.exist == false) {							
							loadAppFiles(tab.id, [
								'css/styles.css',
								'css/fonts.css', 
								'css/perfect-scrollbar.css', 

								'js/jquery.js',
								'js/jquery-ui.js',
								'js/underscore.js', 
								'js/backbone.js', 
								'js/icanhaz.js', 
								'js/socketio.js', 
								'js/md5.js', 
								'js/templates.js',
								
								'js/jquery.mousewheel.js',
								'js/perfect-scrollbar.js',

								'js/viewModels/appViewModel.js',
								'js/viewModels/tabViewModel.js',
								'js/viewModels/discViewModel.js',
								
								'js/viewModels/menuViewModel.js',
								'js/viewModels/menus/usersMenuViewModel.js',
								'js/viewModels/menus/settingsMenuViewModel.js',

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
						delete tabObjs[tabHashed];
					}else{
						tabObjs[tabHashed].url = tab.url;
					}
				}else{
					delete tabObjs[tabHashed];
				}	
			}
		}
	}
});
*/