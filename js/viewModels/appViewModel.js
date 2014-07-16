


var AppModel = Backbone.Model.extend({

	initialize: function () {

	},

	fetch : function() {

	}

});



var AppView = Backbone.View.extend({

	className : 'page_swarm',

	events: {
		'mouseover': 'appEnter',
		'mouseout': 'appLeave',
	},

	initialize: function () {
		this.render();
	},
	
	appEnter: function(e) {
		e.stopPropagation();
	},

	appLeave: function(e) {
		e.stopPropagation();
	},

	render: function () {

		PS.Models.TabModel = new TabModel(); 
		PS.Views.TabView  = new TabView({
			model : PS.Models.TabModel
		});

		PS.Models.DiscModel = new DiscModel(); 
		PS.Views.DiscView  = new DiscView({
			model : PS.Models.DiscModel
		});		
		this.$el.append(PS.Views.TabView.$el);		
		this.$el.append(PS.Views.DiscView.$el);

		//chrome.storage.local.remove('appStatus', _.bind(function(result) {}));

		chrome.storage.local.get('appStatus', _.bind(function(result) {

			if(result.appStatus) {
				if(result.appStatus.status == 'close') {
					PS.Views.DiscView.$el.css({
						'right' : '-500px'
					});
					PS.Views.TabView.$el.css({
						'right' : '0px'
					});
				}else{
					PS.Views.DiscView.$el.css({
						'right' : '0px'
					});
				}
			}else{
				setTimeout(_.bind(function(){
					PS.Views.DiscView.close();
				}, this), 500);
			}

		},this));

	},

	checkUpdates: function() {

		chrome.storage.local.get('appStatus', _.bind(function(result) {
			if(result.appStatus) {
				if(result.appStatus.status == 'open') {
					PS.Views.DiscView.show();
				}else if(result.appStatus.status == 'close') {
					PS.Views.DiscView.hide();
				}
			}
		}, this));

		chrome.storage.local.get('user', _.bind(function(result) {
			if(result.user) {
				if(PS.user.token != result.user.token) {				
					PS.user = result.user;
					PS.socket.emit('changeconnection', { "room" : PS.room });
					PS.Views.ContentView.startChat(PS.user);
				}
			}
		}, this));
	},

	reRender : function() {

	},

	destroy : function(){

	}

});