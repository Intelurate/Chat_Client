

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
		'click .close_app' : 'closeApp',
		'click .users' : 'showCloseUsers',
		'click .add_user' : 'addNewUser'
	},

	appLocked : false,

	initialize: function (d) {
		
		this.render();		
		this.listenTo(this.model, "change:showcurrentconnections", this.showCurrentConnections);
		PS.socket.emit('getcurrentconnections', { "room" : PS.room });
	},

	addNewUser: function(e) {
		PS.socket.emit('changeconnection', { "room" : PS.room });
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
	},


	setUpdatedConnections : function(count) {	
		this.$el.find('.connections .connection_count').text(count);
	},

	destroy : function() {
		this.$el.remove();
	}

});



