

var ContentModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {

		PS.socket.on('showyourconnected', _.bind(function (username, users) {	
			this.set({ 'showyourconnected' : { 'users' : users, 'username' : username } });
		}, this));

		PS.socket.on('updatechat', _.bind(function (username, created, data) {
			this.set({'updatechat' : {'name' : username, 'date' : created, 'message' : data } });			
		}, this));

		PS.socket.on('getsavedchat', _.bind(function (username, data, room) {
			this.set({ 'getsavedchat' : { 'username' : username, 'data' : data, 'room' : room }});
		}, this));

		PS.socket.on('shownewuser', _.bind(function (username, users) {
			this.set({ 'shownewuser' : { 'username' : username, 'users' : users }});
		}, this));

		PS.socket.on('userdisconnected', _.bind(function (username, users) {
			this.set({ 'userdisconnected' : { 'username' : username, 'users' : users }});
		}, this));

		PS.socket.on('usernameliveexist', _.bind(function (status) {
			this.set({ 'usernameliveexist' : { 'status' : status }});
		}, this));

	}
});



var ContentView = Backbone.View.extend({
	
	className : 'page_swarm_contents',

	events: {
		'keydown .usernameForm .username': 'chatStart',
		'keydown .chatarea .data': 'sendChat',		
		'click .facecon' : 'addFaceIcon'
	},

	initialize: function (d) {
        this.listenTo(this.model, "change:showyourconnected", this.showYourConnected);
        this.listenTo(this.model, "change:updatechat", this.updateChat);
        this.listenTo(this.model, "change:getsavedchat", this.getSavedChat);
        this.listenTo(this.model, "change:shownewuser", this.showNewUser);
        this.listenTo(this.model, "change:userdisconnected", this.userDisconnected); 
        this.listenTo(this.model, "change:usernameliveexist", this.userNameLiveExist);         
		this.render();
	},

	render: function () {

		PS.Models.StatusModel = new StatusModel();
		PS.Views.StatusView = new StatusView({
			model : PS.Models.StatusModel
		});

		this.$el.append(PS.Views.StatusView.$el);	

		chrome.storage.sync.get('username', _.bind(function(result) {			
			if(result.username.swarm_username) {
				
				this.loadUserNameForm();
				
				//this.startChat(result.username.swarm_username);
				//PS.username = result.username.swarm_username;
			}else{
				this.loadUserNameForm();
			}

		}, this));


	},

	addFaceIcon: function (e) {
		var target = $(e.currentTarget);
		var classes = target.attr('class').split(' ');
		for(classs in classes) {			
			if(classes[classs].indexOf('icon-') != -1) {				
				var icon = classes[classs].split('icon-')[1];
				//needs to add at the location of the cursor.
				//right now it just adds it to the end of the text
				this.$el.find('.data')
					.append('<img src="'+chrome.extension.getURL("/images/emotocons/"+icon+".png")+'" class="emotocon" width="16" />')
					.focus();
				
				break;
			}
		}
	},

	loadUserNameForm: function() {
		this.$el.append(ich.usernameForm());
	},

	userNameLiveExist : function() {
		var usernameliveexist = this.model.toJSON().usernameliveexist;
		if(usernameliveexist.status) {
			PS.Views.StatusView.updateStatus("This username is currently being used in this discussion. If may also be getting this if you are already on this page in another tab.");
		}
	},

	updateChat : function() {
		var updatechat = this.model.toJSON().updatechat;
		var date = new Date(updatechat.date);
		updatechat.date = date.toString().split("GMT")[0].trim();
		updatechat.message = updatechat.message.replace(/&lt;/g, '<');
		updatechat.message = updatechat.message.replace(/&#34;/g, '"');
		updatechat.message = updatechat.message.replace(/&gt;/g, '>');
		updatechat.message = updatechat.message.replace(/&amp;nbsp;/g, '');
		this.$el.find('.conversation .empty_comments').remove();
		if(PS.username == updatechat.name) {
			updatechat.name = updatechat.name.split('____')[1];
			this.$el.find('.conversation').prepend(ich.messagePostLeft(updatechat));
		}else{
			updatechat.name = updatechat.name.split('____')[1];
			this.$el.find('.conversation').prepend(ich.messagePostRight(updatechat));
		}
	},

	showNewUser : function() {
		var shownewuser = this.model.toJSON().shownewuser;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(shownewuser.users.count);
		PS.Views.StatusView.updateStatus(shownewuser.username.split('____')[1] + " has entered the discussion...");
	},

	userDisconnected : function() {
		var userdisconnected = this.model.toJSON().userdisconnected;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(userdisconnected.users.count);
		PS.Views.StatusView.updateStatus(userdisconnected.username.split('____')[1] + " has left the discussion...");
	},


	emptyChatBox : function() {
		this.$el.empty();
		this.render();
	},

	getSavedChat : function() {

		var conv = this.$el.find('.conversation');			
		var getsavedchat = this.model.toJSON().getsavedchat;

		var data = getsavedchat.data;
		var buildchat = [];

		if(data.length > 0) {
			for(d in data) {
				var date = new Date(data[d].created);
				createdDate = date.toString().split("GMT")[0].trim();	
				data[d].date = createdDate;

				var chat = data[d].chat;
				chat = chat.replace(/&lt;/g, '<');
				chat = chat.replace(/&#34;/g, '"');
				chat = chat.replace(/&gt;/g, '>');
				chat = chat.replace(/&amp;nbsp;/g, '');

				var da = { 
					name : data[d].name.split('____')[1], 
					date : createdDate.trim(), 
					message : chat 
				};

				if(data[d].name == PS.username) {
					buildchat.push(ich.messagePostLeft(da));
				}else{
					buildchat.push(ich.messagePostRight(da));
				}
			}
			conv.prepend(buildchat);
		} else{
			buildchat.push('<p class="empty_comments">Be the first to comment on this page.</p>');
			conv.prepend(buildchat.join(''));
		}		
	},

	sendChat : function(e) {
		if(e.which == 13) {	
			e.preventDefault();
			var target = $(e.currentTarget);			
			var message = target.html();

			var replaceStr = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	    	message = message.replace(replaceStr, '<a href="$1" target="_blank">$1</a>');
			var replaceStr2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    		message = message.replace(replaceStr2, '$1<a href="http://$2" target="_blank">$2</a>');

			if(message != "") {
				target.html("");
				PS.socket.emit('sendchat', message);
			}
		}
	},

	showYourConnected : function() {
		var userCount = this.model.toJSON().showyourconnected.users.count;
		var username = this.model.toJSON().showyourconnected.username;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(userCount);
		username = username.split('____')[1];
		PS.Views.StatusView.updateStatus("You " + username + " are now connected to the discussion...");
		this.$el.find('.usernameForm').remove();
		this.$el.append(ich.chatArea());
	},

	updateUserStatus : function() {

	},

	chatStart : function(e) {
		if(e.which == 13) {

			var username = $('.username').val();

			var date = new Date();
			username = MD5(date.getTime()+username) + '____' + username; 
			chrome.storage.sync.set({'username': { "swarm_username" : username } }, _.bind(function() {
				PS.username = username;
				this.startChat(username);
			}, this));

			//chrome.storage.sync.set({'chatAppUsername' : username });			
			//this.startChat(username);
		}
	},

	startChat : function(username) {
		var url = document.URL.split('#');
		var room = url[0];
		room = MD5(room);
		PS.socket.emit('adduser', { "username" : username, "room" : room });			
	},

	destroy : function() {

	}
	
});