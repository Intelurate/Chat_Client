
//username
var ContentModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {

		chrome.runtime.onMessage.addListener(_.bind(function(request, sender, sendResponse) {

			switch(request.command) {
				case 'shownewuser':
					this.set({ 'shownewuser' : { data : request.data } });
				break;		
				case 'verifyconnection':
					this.set({ 'verifyconnection' : { data : request.data } });
				break;		
				case 'updatechat':
					this.set({ 'updatechat' : { data : request.data } });
				break;		
				case 'selfdisconnected':
					this.set({ 'selfdisconnected' : { data : request.data } });
				break;	
				case 'sendpaging':
					this.set({ 'sendpaging' : { data : request.data } });
				break;		
				case 'userdisconnected':
					this.set({ 'userdisconnected' : { data : request.data } });
				break;									
			}

		}, this));	


		/*
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
		*/

	}
});

var ContentView = Backbone.View.extend({
	
	className : 'page_swarm_contents',

	events: {
		'keydown .usernameForm .username': 'chatStart',
		'click .usernameForm .join_btn': 'chatStart',		
		'keydown .chatarea .data': 'sendChat',		
		'click .facecon' : 'addFaceIcon',
		'scroll' : 'scrolling'
	},

	page : 0,

	added : 0,
	
	loadingPage : false,

	initialize: function (d) {

		this.listenTo(this.model, "change:verifyconnection", this.verifyConnection);
		this.listenTo(this.model, "change:updatechat", this.updateChat);
		this.listenTo(this.model, "change:selfdisconnected", this.selfDisconnected);
        this.listenTo(this.model, "change:sendpaging", this.sendPaging); 
        
        this.listenTo(this.model, "change:userdisconnected", this.userDisconnected);

		/*
        this.listenTo(this.model, "change:showyourconnected", this.showYourConnected);
        this.listenTo(this.model, "change:getsavedchat", this.getSavedChat);
        this.listenTo(this.model, "change:shownewuser", this.showNewUser);
        this.listenTo(this.model, "change:userdisconnected", this.userDisconnected); 
        this.listenTo(this.model, "change:userchanged", this.userChanged); 
        this.listenTo(this.model, "change:getpaging", this.getPaging); 
        this.listenTo(this.model, "change:usernameliveexist", this.userNameLiveExist);         
        */

		this.render();
	},

	render: function () {

		chrome.storage.local.get('user', _.bind(function(result) {
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

				var pos = d.caret('pos');

				console.log(pos);

				//jkdjghk<img>kjdfhgkdjfhd

				var txt = d.html().insertAt(pos, '<img src="http://icons.pageswarm.com/'+icon+'.png" class="emotocon" />');
				d.html(txt);
				//d.focus()

				//d.append('<img src="http://icons.pageswarm.com/'+icon+'.png" class="emotocon" />')
				//	.focus();
				
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

	sendPaging : function() {

		var conv = this.$el.find('.spacer'),
			sendpaging = this.model.toJSON().sendpaging,
			data = sendpaging.data,
			buildchat = [];

		if(data.items.length > 0) {
			for(d in data.items) {
				var date = new Date(data.items[d].created);
					createdDate = date.toString().split("GMT")[0].trim();	
					data.items[d].date = createdDate;

				var chat = data.items[d].chat;
					chat = atob(chat);

				var da = { 
					id : data.items[d]._id,
					username : data.items[d].username, 
					date : createdDate.trim(), 
					message : chat 
				};

				if(data.items[d].token == PS.user.token) {
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

		var updatechat = this.model.toJSON().updatechat.data.data;

		var createdDate = new Date(updatechat.result.created);
			updatechat.result.chat = atob(updatechat.result.chat);
		var da = { 
			id : updatechat.result._id,
			username : updatechat.result.username, 
			date : createdDate, 
			message : updatechat.result.chat
		};

		this.$el.find('.conversation .empty_comments').remove();

		if(PS.user.username == updatechat.user.username && PS.user.token == updatechat.user.token) {			
			updatechat.username = updatechat.user.username;
			this.$el.find('.conversation').prepend(ich.messagePostLeft(da));
		}else{
			updatechat.username = updatechat.user.username;
			this.$el.find('.conversation').prepend(ich.messagePostRight(da));
		}

		this.$el.find('.conversation_holder').scrollTop(0);

		this.added = (this.added+1);
	},

	selfDisconnected : function() {
		
		var selfdisconnected = this.model.toJSON().selfdisconnected;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(selfdisconnected.data.count);
		PS.Views.StatusView.updateStatus("Your user have been disconnected from the discussion...");
		this.createNewUser();
	},

	emptyChatBox : function() {
		this.$el.empty();
		this.render();
	},

	getSavedChat : function(getsavedchat) {

		var conv = this.$el.find('.conversation');
		
		var data = getsavedchat;
		var buildchat = [];

		if(data.length > 0) {
			for(d in data) {
				var date = new Date(data[d].created);
				createdDate = date.toString().split("GMT")[0].trim();	
				data[d].date = createdDate;

				var chat = data[d].chat;					
					chat = atob(chat);

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
			message = btoa(message);
			if(message != "") {
				target.html("");
				chrome.runtime.sendMessage({ command : 'sendchat', data : { room : PS.room, user : PS.user, message : message } }, function(){});
				//PS.socket.emit('sendchat', message);
			}
		}
	},

	loadPage : function() {

		var url = document.URL.split('#');
		var room = url[0];
			room = MD5(room);
			this.page = (this.page+1);
		var paging = { page : this.page, skipped : this.added };
	
		chrome.runtime.sendMessage({ command : 'getpaging', 
			data : { 
				paging: paging, room : PS.room, user : PS.user 
			} 
		}, function(){});
		
		//PS.socket.emit('setpaging', { paging : paging });
	},

	verifyConnection : function() {

		var d = this.model.toJSON().verifyconnection.data;
		var usersCount = d.count;	
		PS.Views.HeaderView.setUserCount(usersCount);

		this.loadingPage = false;
		this.page = 0;

		var username = d.user.username;

		PS.Views.StatusView.updateStatus("You " + username + " are now connected to the page discussion...");
		this.$el.find('.usernameForm').remove();
		this.$el.append(ich.chatArea());

		this.getSavedChat(d.items);

		this.$el.find('.conversation_holder').unbind('scroll');
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

	chatStart : function(e) {
		if(e.which == 13 || e.which == 1) {
			var username = this.$el.find('.username').val();
			if(username.trim().length > 0) {
				var date = new Date();
				var token = MD5(date.getTime()+username); 			
				var user = { "username" : username, token : token };
				chrome.storage.local.set({ 'user' : user }, _.bind(function() {
					PS.user = user;
					this.startChat(PS.user);				
				}, this));
			}	
		}
	},

	startChat : function(user) {
		chrome.runtime.sendMessage({ command : 'startconnection', data : { room : PS.room, user : user } }, function(){});
	},

	destroy : function() {

	}
	
});