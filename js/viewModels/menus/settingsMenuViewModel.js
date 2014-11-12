


var SettingsMenuModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {		
		var scope = this;
		
		/*
		PS.socket.on('showuserlist', function (users) {
			scope.set({ 'showuserlist' : { 'users' : users } });				
		});
		*/

	},

	settings : {

	}

});



var SettingsMenuView = Backbone.View.extend({

	className : 'settings_menu',

	events: {

	},

	users: [],

	width: '160',

	initialize: function () {

	},

	render: function () {

		this.$el.empty().append(ich.settingsForm());


		//this.$el.find('.settings').empty().append(ich.settingsForm());

		//PS.socket.emit('getuserlist', { "room" : PS.room });

		this.listenTo(this.model, "change:showuserlist", this.showUsersList);
	},

	showSettings: function() {
		//var users = this.model.toJSON().showuserlist.users;
		//this.$el.find('.settings').empty().append(ich.settingsForm());
	},

	destroy : function() {

	}

});


