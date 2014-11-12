


var UsersMenuModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {		
		var scope = this;

		PS.socket.on('showuserlist', _.bind(function (d) {
			console.log(d);
			this.set({ 'showuserlist' : { data : d } });
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
	},

	render: function () {
		this.$el.empty().append('<h2>ONLINE</h2><div class="user_list"></div>');
		//PS.socket.emit('getuserlist', data : { room : PS.room, user : PS.user } );
	},

	showUsersList: function() {

		console.log(this.model.toJSON().showuserlist);
		
		var users = this.model.toJSON().showuserlist.data.users;
			usersKeys = _.keys(users);
			
		PS.Views.HeaderView.setUserCount(usersKeys.length);

		var userBuilder = [];
		for(userKey in usersKeys) {
			userBuilder.push( '<p>' + users[usersKeys[userKey]] + '</p>' );
		}
		this.$el.find('.user_list').empty().append(userBuilder.join(''));
	},

	destroy : function() {

	}

});