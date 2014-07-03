


var DiscModel = Backbone.Model.extend({

	initialize: function () {

	},

	fetch : function() {

	}

});



var DiscView = Backbone.View.extend({

	className : 'page_swarm_discussion',

	events: {
		//'mousedown' : 'moveTab',
		//'mouseup' : 'placeTab',
		//'click' : 'openPageSwarm'
	},

	status : true,

	initialize: function () {
		this.render();
	},

	render: function () {

		this.$el.css({
			'background-image' : 'url(' + chrome.extension.getURL("/images/honey_comb.png") + ')'
		});


		PS.Models.UserListModel = new UserListModel(); 
		PS.Views.UserListView  = new UserListView({
			model : PS.Models.UserListModel
		});	
		this.$el.append(PS.Views.UserListView.$el);	


		this.$el.append('<div class="page_swarm_left"></div>');	



		PS.Models.HeaderModel = new HeaderModel(); 
		PS.Views.HeaderView  = new HeaderView({
			model : PS.Models.HeaderModel
		});
		this.$el.find('.page_swarm_left').append(PS.Views.HeaderView.$el);	


		PS.Models.ContentModel = new ContentModel(); 
		PS.Views.ContentView  = new ContentView({
			model : PS.Models.ContentModel
		});	
		this.$el.find('.page_swarm_left').append(PS.Views.ContentView.$el);


	},

	close: function() {
		this.$el.stop();
		this.$el.animate({
			'right' : '-500px'
		}, 300, _.bind(function() {
			PS.Views.TabView.open();
			chrome.storage.sync.set({'appStatus': { status : 'close' } }, function(){});	
		}, this));	
	},

	open: function() {
		this.$el.stop();
		this.$el.animate({
			'right' : '0'
		}, 300, function() {
			chrome.storage.sync.set({'appStatus': { status : 'open' } }, function(){});		
		});	
	},

	destroy : function() {

	}

});