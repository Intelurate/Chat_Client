

var HeaderModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {		
	
	}

});



var HeaderView = Backbone.View.extend({
	
	className : 'header_bar',

	events: {
		'click .close_app' : 'closeApp',

		'click .minmize_up' : 'minimizeAppUp',

		'click .minmize_down' : 'minimizeAppDown',				

		'click .users' : 'showLiveUsers',		
		'click .add_user' : 'addNewUser',
		'click .settings' : 'showSettings',
		'click .terms_of_use' : 'showTerms'
	},

	appLocked : false,

	initialize: function (d) {
		this.render();		
		
		//this.listenTo(this.model, "change:verifyconnection", this.verifyConnection);
		//this.listenTo(this.model, "change:showcurrentconnections", this.showCurrentConnections);
		//PS.socket.emit('getcurrentconnections', { "room" : PS.room });
	},

	addNewUser: function(e) {

		chrome.runtime.sendMessage({ command : 'endconnection', data : { room : PS.room, user : PS.user } }, function(){});

		//PS.socket.emit('changeconnection', { "room" : PS.room });
	},

	render: function () {
		this.$el.append(ich.headerBar());
		//this.$el.find('.terms_of_use .terms .terms_scroller').perfectScrollbar();
	},

	termsDisplayed : false,

	showTerms: function(e) {

		if(this.termsDisplayed == false) {
			this.$el.find('.terms_of_use .terms').animate({
				width: '388px',
				height: '300px',
				left: '6px',
				bottom: '22px'						
			}, 300, _.bind(function() {
				this.termsDisplayed = true;
			}, this));
		}else{					
			this.$el.find('.terms_of_use .terms').animate({
				width: '0px',
				height: '0px',
				left: '3px',
				bottom: '3px'	
			}, 300, _.bind(function() {
				this.termsDisplayed = false;
			}, this));
		}	
	},

	closeApp: function() {
		PS.Views.DiscView.close();
	},



	showSettings: function(e) {
		PS.Views.MenuView.toggle('Settings');
	},

	showLiveUsers: function(e) {
		PS.Views.MenuView.toggle('Users');
	},

	minStatus : 0,

	minimizeAppUp: function(e) {

		switch(this.minStatus) {
			case 1:	
				this.minStatus = 0;
				PS.Views.AppView.$el.removeClass('min');
				break;				
			case 2:
				this.minStatus = 1;
				PS.Views.AppView.$el.addClass('min');
				PS.Views.AppView.$el.removeClass('min_down');				
				break;
		}

	},

	minimizeAppDown: function(e) {

		switch(this.minStatus) {
			case 0:
				this.minStatus = 1;
				PS.Views.AppView.$el.addClass('min');
				break;
			case 1:	
				this.minStatus = 2;
				PS.Views.AppView.$el.removeClass('min');
				PS.Views.AppView.$el.addClass('min_down');
				break;				
		}

	},

	setUserCount : function(count) {
		this.$el.find('.connections .connection_count').text(count);
	},

	setUpdatedConnections : function(count) {	
		this.$el.find('.connections .connection_count').text(count);
	},

	destroy : function() {
		this.$el.remove();
	}

});



