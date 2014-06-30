

var HeaderModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {		
		var scope = this;
		PS.socket.on('showcurrentconnections', function (room) {
			scope.set({ 'showcurrentconnections' : { 'room' : room } });				
		});
	}

});



var HeaderView = Backbone.View.extend({
	
	className : 'header_bar',

	events: {
		'click .close_app': 'closeApp',
		'click .users': 'showCloseUsers'
	},

	appLocked : false,

	initialize: function (d) {
		
		this.render();		
		this.listenTo(this.model, "change:showcurrentconnections", this.showCurrentConnections);
		PS.socket.emit('getcurrentconnections', { "room" : PS.room });

		/*
		chrome.storage.sync.get('lockApp', _.bind(function(result) {
			if(result.lockApp) {
				if(result.lockApp == true) {
					this.appLocked = true;
				}else{
					this.appLocked = false;
				}
			}else{
				this.appLocked = false;
			}
			this.parent = d.parent;		
			this.parent.contentView.statusView.startConnectingStatus();
	        this.listenTo(this.model, "change:showcurrentconnections", this.showCurrentConnections);        
			window.socketX.emit('getcurrentconnections', { "room" : window.room });
			this.render();

			if(this.appLocked == false) {
				setTimeout(_.bind(function(){
					this.parent.animateIn();
				}, this), 1000);
			}

		}, this));
		*/
	},

	render: function () {
		this.$el.append(ich.headerBar());
	},

	closeApp: function() {
		PS.Views.DiscView.close();
	},

	showCloseUsers: function() {
		if(PS.Views.UserListView.userDisplayStatus == 'open'){
			PS.Views.UserListView.close();
		}else{
			PS.Views.UserListView.open();
		}
	},

	showCurrentConnections : function() {	
		var room = this.model.toJSON().showcurrentconnections.room;
		var usersCount = room.count;	
		this.$el.find('.connections .connection_count').text(usersCount);

		//this.parent.contentView.statusView.$el.empty();
		//this.parent.contentView.$el.append(ich.chatStart());
		//var usersCount = this.model.toJSON().showcurrentconnections.usersCount;		
		//this.$el.find('.connections .connection_count').text(usersCount);

		/*
		chrome.storage.sync.get('chatAppUsername', _.bind(function(result) {
			if(result.chatAppUsername != null) {
				this.parent.contentView.startChat(result.chatAppUsername);
			}
		}, this));
		*/

	},


	/*
	lockApp : function(e) {
		if(this.appLocked == true) {
			this.appLocked = false;
			chrome.storage.sync.set({'lockApp': false }, function(){});			
		} else {
			this.appLocked = true;
			chrome.storage.sync.set({'lockApp': true }, function(){});
		}
	},

	getAppLockStatus : function() {
		return this.appLocked;
	},

	initialize: function (d) {
		
		chrome.storage.sync.get('lockApp', _.bind(function(result) {
			if(result.lockApp) {
				if(result.lockApp == true) {
					this.appLocked = true;
				}else{
					this.appLocked = false;
				}
			}else{
				this.appLocked = false;
			}
			this.parent = d.parent;		
			this.parent.contentView.statusView.startConnectingStatus();
	        this.listenTo(this.model, "change:showcurrentconnections", this.showCurrentConnections);        
			window.socketX.emit('getcurrentconnections', { "room" : window.room });
			this.render();

			if(this.appLocked == false) {
				setTimeout(_.bind(function(){
					this.parent.animateIn();
				}, this), 1000);
			}

		}, this));
	},
	*/

	setUpdatedConnections : function(count) {	
		this.$el.find('.connections .connection_count').text(count);
	},

	destroy : function() {
		this.$el.remove();
	}

});



