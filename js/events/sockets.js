
var PSX = {
	socket : io.connect('http://localhost:8888/'),
	commands : {
		send : function(command, data) {
			if(PSX.socket.socket.connected) {
				PSX.socket.emit(command, data);
			}else{
				PSX.socket.socket.connect();
				PSX.socket.emit(command, data);
			}			
		}
	},
	rooms : {}
}


PSX.socket.on('verifyconnection', function (d) {

	if(PSX.rooms[d.data.room]) {					
		if(!PSX.rooms[d.data.room].tabs[d.data.tabId]) {
			PSX.rooms[d.data.room].tabs[d.data.tabId] = { id : d.data.tabId, user : d.data.user };	
		}
	}else{
		PSX.rooms[d.data.room] = {};
		PSX.rooms[d.data.room].tabs = {};	
		PSX.rooms[d.data.room].tabs[d.data.tabId] = { id : d.data.tabId, user : d.data.user };
	}

	chrome.tabs.sendMessage(d.data.tabId, { command : 'verifyconnection', data : d.data }, function() {});
});



PSX.socket.on('shownewuser', function (d) {
	chrome.tabs.sendMessage(d.data.tabId, { command : 'shownewuser', data : d.data }, function() {});
});


PSX.socket.on('sendpaging', function (d) {
	chrome.tabs.sendMessage(d.tabId, { command : 'sendpaging', data : d }, function() {});
});



PSX.socket.on('userdisconnected', function (d) {
	chrome.tabs.sendMessage(d.data.tabId, { command : 'userdisconnected', data : d.data }, function() {});
});




PSX.socket.on('userleftroom', function (d) {
	
	if(PSX.rooms[d.room]) {					
		if(PSX.rooms[d.room].tabs) {
			var tabs = _.keys(PSX.rooms[d.room].tabs);
			for(tab in tabs) {
				chrome.tabs.sendMessage(parseInt(tabs[tab]), { command : 'userleftroom', data : d }, function() {});
			}
		}
	}
});

PSX.socket.on('userentersroom', function (d) {
	
	if(PSX.rooms[d.room]) {					
		if(PSX.rooms[d.room].tabs) {
			var tabs = _.keys(PSX.rooms[d.room].tabs);
			for(tab in tabs) {
				chrome.tabs.sendMessage(parseInt(tabs[tab]), { command : 'userentersroom', data : d }, function() {});
			}
		}
	}
});


PSX.socket.on('showuserlist', function (d) {
	chrome.tabs.sendMessage(d.tabId, { command : 'showuserlist', data : d }, function() {});
});


PSX.socket.on('selfdisconnected', function (d) {
	chrome.tabs.sendMessage(d.data.tabId, { command : 'selfdisconnected', data : d.data }, function() {});
});


PSX.socket.on('updatechat', function (d) {
	if(PSX.rooms[d.data.room]) {					
		if(PSX.rooms[d.data.room].tabs) {
			var tabs = _.keys(PSX.rooms[d.data.room].tabs);
			for(tab in tabs) {
				chrome.tabs.sendMessage(parseInt(tabs[tab]), { command : 'updatechat', data : d }, function() {});
			}
		}
	}
});


//PSX.socket.emit('start_connection', { "room" : PSX.room });
//PSX.socket.on('verify_connection', function (data) {	
//});
