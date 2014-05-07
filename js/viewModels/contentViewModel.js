

var ContentModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {
		window.socketX.on('showyourconnected', _.bind(function (username, users) {	
			this.set({ 'showyourconnected' : { 'users' : users, 'username' : username } });
		}, this));

		window.socketX.on('updatechat', _.bind(function (username, created, data) {
			this.set({'updatechat' : {'username' : username, 'created' : created, 'data' : data } });			
		}, this));

		window.socketX.on('getsavedchat', _.bind(function (username, data, room) {

			this.set({ 'getsavedchat' : { 'username' : username, 'data' : data, 'room' : room }});

		}, this));

		window.socketX.on('shownewuser', _.bind(function (username, users) {
			this.set({ 'shownewuser' : { 'username' : username, 'users' : users }});
		}, this));

		window.socketX.on('userdisconnected', _.bind(function (username, users) {
			this.set({ 'userdisconnected' : { 'username' : username, 'users' : users }});
		}, this));

	}
});



var ContentView = Backbone.View.extend({
	
	className : 'chatA99_contents',

	events: {
		'keydown .chatstart .username': 'chatStart',
		'keydown .chatarea .data': 'sendChat',		
	},

	initialize: function (d) {
		this.parent = d.parent;
        this.listenTo(this.model, "change:showyourconnected", this.showYourConnected);
        this.listenTo(this.model, "change:updatechat", this.updateChat);
        this.listenTo(this.model, "change:getsavedchat", this.getSavedChat);
        this.listenTo(this.model, "change:shownewuser", this.showNewUser);
        this.listenTo(this.model, "change:userdisconnected", this.userDisconnected);         
		this.render();
	},



	updateChat : function() {
		var updatechat = this.model.toJSON().updatechat;
		var date = new Date(updatechat.created);
		updatechat.date = date.toString().split("GMT")[0].trim();
		this.$el.find('.conversation .empty_comments').remove();
		this.$el.find('.conversation').prepend(ich.updateChat(updatechat));
	},

	showNewUser : function() {
		var shownewuser = this.model.toJSON().shownewuser;
		this.parent.headerView.$el.find('.connections .connection_count').text(shownewuser.users.count);
		this.statusView.updateStatus(shownewuser.username + " has entered the discussion...");
	},

	userDisconnected : function() {
		var userdisconnected = this.model.toJSON().userdisconnected;
		this.parent.headerView.$el.find('.connections .connection_count').text(userdisconnected.users.count);
		this.statusView.updateStatus(userdisconnected.username + " has left the discussion...");
	},

	getSavedChat : function() {
		var conv = this.$el.find('.conversation');		
			
			var getsavedchat = this.model.toJSON().getsavedchat;

			console.log(_.keys(getsavedchat.room.users));

			var data = getsavedchat.data;
			var buildchat = [];
			if(data.length > 0) {
				for(d in data) {
					var date = new Date(data[d].created);
					createdDate = date.toString().split("GMT")[0].trim();	
					data[d].date = createdDate;
					buildchat.push('<p><strong>'+data[d].name+':</strong><span class="date"> ('+createdDate.trim()+') </span></br><span>'+data[d].chat+'</span></p>');													
				}
			} else{
				buildchat.push('<p class="empty_comments">Be the first to comment on this page.</p>');
			}		

			conv.prepend(buildchat.join(''));
	},

	sendChat : function(e) {
		if(e.which == 13) {	
			e.preventDefault();
			var target = $(e.currentTarget);			
			var message = target.val();

			if(message != ""){
				target.val("");
				window.socketX.emit('sendchat', message);
			}
		}
	},

	showYourConnected : function() {
		var userCount = this.model.toJSON().showyourconnected.users.count;
		var username = this.model.toJSON().showyourconnected.username;
		this.parent.headerView.$el.find('.connections .connection_count').text(userCount);
		this.statusView.updateStatus("You " + username + " are now connected to the discussion...");
		this.$el.find('.chatstart').remove();
		this.$el.append(ich.chatArea());

	},

	updateUserStatus : function() {

	},

	render: function () {
		this.statusView = new StatusView({
			model : new StatusModel()
		});
		this.$el.append(this.statusView.$el);
		//this.$el.append(ich.chatStart());

	},

	chatStart : function(e) {
		if(e.which == 13) {
			var username = $('.username').val();
			var addNewUser = { "user" : username };			
			localStorage.setItem("ChatAppUser", JSON.stringify(addNewUser) );
			this.startChat(username);
		}
	},

	startChat : function(username) {

		var url = document.URL.split('#');
		var room = url[0];
		room = MD5(room);

		window.socketX.emit('adduser', { "username" : username, "room" : room });	

		//$('.chatapp .data').val('').focus();		
	},

	destroy : function() {

	}
	
});