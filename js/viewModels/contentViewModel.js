
//username
var ContentModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {

		PS.socket.on('showyourconnected', _.bind(function (user, users) {	
			this.set({ 'showyourconnected' : { 'user' : user, 'users' : users } });
		}, this));

		PS.socket.on('updatechat', _.bind(function (user, data) {
			this.set({'updatechat' : {'user' : user, 'data' : data } });			
		}, this));

		PS.socket.on('getsavedchat', _.bind(function (user, data, room) {
			this.set({ 'getsavedchat' : { 'user' : user, 'data' : data, 'room' : room }});
		}, this));

		PS.socket.on('shownewuser', _.bind(function (user, users) {
			this.set({ 'shownewuser' : { 'user' : user, 'users' : users }});
		}, this));

		PS.socket.on('userdisconnected', _.bind(function (user, users) {
			this.set({ 'userdisconnected' : { 'user' : user, 'users' : users }});
		}, this));

		PS.socket.on('userchanged', _.bind(function (user, users) {
			this.set({ 'userchanged' : { 'user' : user, 'users' : users }});
		}, this));

		PS.socket.on('getpaging', _.bind(function (user, data, room) {
			this.set({ 'getpaging' : { 'user' : user, 'data' : data, 'room' : room }});
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
		'click .facecon' : 'addFaceIcon',
		'scroll' : 'scrolling'
	},

	page : 0,

	added : 0,
	
	loadingPage : false,

	initialize: function (d) {
        this.listenTo(this.model, "change:showyourconnected", this.showYourConnected);
        this.listenTo(this.model, "change:updatechat", this.updateChat);
        this.listenTo(this.model, "change:getsavedchat", this.getSavedChat);
        this.listenTo(this.model, "change:shownewuser", this.showNewUser);
        this.listenTo(this.model, "change:userdisconnected", this.userDisconnected); 
        this.listenTo(this.model, "change:userchanged", this.userChanged); 
        this.listenTo(this.model, "change:getpaging", this.getPaging); 
        this.listenTo(this.model, "change:usernameliveexist", this.userNameLiveExist);         
		this.render();
	},

	render: function () {

		PS.Models.StatusModel = new StatusModel();
		PS.Views.StatusView = new StatusView({
			model : PS.Models.StatusModel
		});

		this.$el.append(PS.Views.StatusView.$el);	

		chrome.storage.sync.get('user', _.bind(function(result) {
			if(result.user) {
				if(result.user.username) {
					this.startChat(result.user);
					PS.user = result.user;
				}else{
					this.loadUserNameForm();
				}
			}else{
				this.loadUserNameForm();
			}
		}, this));
	},

	createNewUser: function() {
		this.loadUserNameForm();
	},

	addFaceIcon: function (e) {

		var target = $(e.currentTarget);
		var classes = target.attr('class').split(' ');
		for(classs in classes) {			
			if(classes[classs].indexOf('icon-') != -1) {				
				var icon = classes[classs].split('icon-')[1];
				//needs to add at the location of the cursor.
				//right now it just adds it to the end of the text
				
				var d = this.$el.find('.data');
				d.append('<img src="'+chrome.extension.getURL("/images/emotocons/"+icon+".png")+'" class="emotocon" width="16" />')
					.focus();
				
				break;
			}
		}
	},

	loadUserNameForm: function() {
		this.$el.find('.chatarea').remove();
		this.$el.find('.usernameForm').remove();
		this.$el.append(ich.usernameForm());
	},

	userNameLiveExist : function() {
		var usernameliveexist = this.model.toJSON().usernameliveexist;
		if(usernameliveexist.status) {
			PS.Views.StatusView.updateStatus("This username is currently being used in this discussion. If may also be getting this if you are already on this page in another tab.");
		}
	},

	getPaging : function() {

		var conv = this.$el.find('.spacer');
		var getpaging = this.model.toJSON().getpaging;
		var data = getpaging.data;
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
					id : data[d]._id,
					username : data[d].username, 
					date : createdDate.trim(), 
					message : chat 
				};

				if(data[d].token == PS.user.token) {
					buildchat.push(ich.messagePostLeft(da));
				}else{
					buildchat.push(ich.messagePostRight(da));
				}
			}
			conv.before(buildchat);
			this.loadingPage = false;
		}
	},

	updateChat : function() {

		var updatechat = this.model.toJSON().updatechat;
		var createdDate = new Date(updatechat.data.created);

		updatechat.data.chat = updatechat.data.chat.replace(/&lt;/g, '<');
		updatechat.data.chat = updatechat.data.chat.replace(/&#34;/g, '"');
		updatechat.data.chat = updatechat.data.chat.replace(/&gt;/g, '>');
		updatechat.data.chat = updatechat.data.chat.replace(/&amp;nbsp;/g, '');

		var da = { 
			id : updatechat.data._id,
			username : updatechat.data.username, 
			date : createdDate, 
			message : updatechat.data.chat
		};

		this.$el.find('.conversation .empty_comments').remove();

		if(PS.user.username == updatechat.user.username && PS.user.token == updatechat.user.token) {			
			updatechat.username = updatechat.user.username;
			this.$el.find('.conversation').prepend(ich.messagePostLeft(da));
		}else{
			updatechat.username = updatechat.user.username;
			this.$el.find('.conversation').prepend(ich.messagePostRight(da));
		}

		this.added = (this.added+1);
	},

	showNewUser : function() {
		var shownewuser = this.model.toJSON().shownewuser;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(shownewuser.users.count);
		PS.Views.StatusView.updateStatus(shownewuser.user.username + " has entered the discussion...");
	},

	userDisconnected : function() {
		var userdisconnected = this.model.toJSON().userdisconnected;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(userdisconnected.users.count);
		PS.Views.StatusView.updateStatus(userdisconnected.user.username + " has left the discussion...");
	},

	userChanged : function() {
		var userchanged = this.model.toJSON().userchanged;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(userchanged.users.count);
		PS.Views.StatusView.updateStatus("Your user have been disconnected from the discussion...");
		this.createNewUser();
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
					id : data[d]._id,
					username : data[d].username, 
					date : createdDate.trim(), 
					message : chat 
				};

				if(data[d].token == PS.user.token) {
					buildchat.push(ich.messagePostLeft(da));
				}else{
					buildchat.push(ich.messagePostRight(da));
				}
			}
			conv.prepend(buildchat);
			this.page = (this.page+1);
		} else{
			buildchat.push('<p class="empty_comments">Be the first to comment on this page.</p>');
			conv.prepend(buildchat.join(''));
		}		
	},

	sendChat : function(e) {
		e.stopPropagation();
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

	loadPage : function() {
		var url = document.URL.split('#');
		var room = url[0];
			room = MD5(room);
		this.page = (this.page+1);
		var paging = { page : this.page, skipped : this.added };
		PS.socket.emit('setpaging', { paging : paging });
	},

	showYourConnected : function() {
		var userCount = this.model.toJSON().showyourconnected.users.count;
		var username = this.model.toJSON().showyourconnected.user.username;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(userCount);
		PS.Views.StatusView.updateStatus("You " + username + " are now connected to the page discussion...");
		this.$el.find('.usernameForm').remove();
		this.$el.append(ich.chatArea());
		this.$el.find('.conversation_holder').perfectScrollbar().scroll(_.bind(function (e) {
			var target = $(e.target);
			if(this.loadingPage == false) {
				if((target.scrollTop() + this.$el.find('.conversation_holder').height()) == 
					$('.conversation_holder').prop('scrollHeight') ) {
					this.loadingPage = true;
					this.loadPage();
				}
			}

		}, this));		
	},

	updateUserStatus : function() {

	},

	chatStart : function(e) {

		if(e.which == 13) {

			var username = $('.username').val();
			var date = new Date();
			var token = MD5(date.getTime()+username); 			
			var user = { "username" : username, token : token };

			chrome.storage.sync.set({ 'user': user }, _.bind(function() {
				PS.user = user;
				this.startChat(PS.user);
			}, this));

			//chrome.storage.sync.set({'chatAppUsername' : username });			
			//this.startChat(username);			
		}
	},

	startChat : function(user) {
		var url = document.URL.split('#');
		var room = url[0];
		room = MD5(room);
		PS.socket.emit('adduser', { "user" : user, "room" : room });			
	},

	destroy : function() {

	}
	
});