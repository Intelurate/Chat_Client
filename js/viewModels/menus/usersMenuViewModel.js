


var UsersMenuModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {		
		var scope = this;
		chrome.runtime.onMessage.addListener(_.bind(function(request, sender, sendResponse) {
			switch(request.command) {
				case 'showuserlist':
					this.set({ 'showuserlist' : { data : request.data } });
				break;					
			}
		}, this));	
	}

});



var UsersMenuView = Backbone.View.extend({

	className : 'users_menu',

	events: {

	},

	users: [],

	width: '160',

	initialize: function () {
		this.listenTo(this.model, "change:showuserlist", this.showUsersList);			
		//PS.socket.emit('showuserlist', { "room" : PS.room });		
	},

	render: function () {
		this.$el.empty().append('<h2>ONLINE</h2><div class="user_list"></div>');	
		chrome.runtime.sendMessage({ command : 'getuserlist', data : { room : PS.room, user : PS.user } }, function(){});

	},

	showUsersList: function() {

		var users = this.model.toJSON().showuserlist.data.users;

		console.log(users)

			usersKeys = _.keys(users);
		var userBuilder = [];
		for(userKey in usersKeys) {
			userBuilder.push( '<p>' + users[usersKeys[userKey]] + '</p>' );
		}
		this.$el.find('.user_list').empty().append(userBuilder.join(''));
	},

	destroy : function() {

	}

});