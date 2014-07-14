


var UserListModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {		
		var scope = this;
		PS.socket.on('showuserlist', function (users) {
			scope.set({ 'showuserlist' : { 'users' : users } });				
		});
	}

});



var UserListView = Backbone.View.extend({

	className : 'page_swarm_user_list',

	events: {

	},

	userDisplayStatus: 'close',

	users: [],

	initialize: function () {
		this.render();
		PS.socket.emit('getuserlist', { "room" : PS.room });
	},

	render: function () {
		this.$el.append('<h2>ONLINE</h2><div class="user_list"></div>');
		this.listenTo(this.model, "change:showuserlist", this.showUsersList);
	},

	showUsersList: function() {
		var users = this.model.toJSON().showuserlist.users;
			usersKeys = _.keys(users);
		var userBuilder = [];
		for(userKey in usersKeys) {
			userBuilder.push( '<p>' + users[usersKeys[userKey]].username + '</p>' );
		}

		this.$el.find('.user_list').empty().append(userBuilder.join(''));

	},

	add : function(){

	},

	remove: function(){

	},

	open: function() {
		this.$el.stop();
		this.$el.animate({
			'width' : '120px'
		}, 300, _.bind(function() {
			this.userDisplayStatus = 'open';			
		}, this));
	},

	close: function(){
		this.$el.stop();
		this.$el.animate({
			'width' : '0px'
		}, 300, _.bind(function() {
			this.userDisplayStatus = 'close';
		}, this));
	},	

	destroy : function() {

	}

});