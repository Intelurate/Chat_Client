


var DiscModel = Backbone.Model.extend({

	initialize: function () {

	},

	fetch : function() {

	}

});



var DiscView = Backbone.View.extend({

	className : 'page_swarm_discussion',

	events: {
		'mouseenter' : 'openPageSwarm',
		'mouseleave' : 'outPageSwarm'
	},

	sliding : false,

	onFocus: false,

	appStatus: 'open',	

	openPageSwarm: function(e) {
		if(this.onFocus == false) {
			this.onFocus = true;
			this.animateOpacity('1');
		}
	},

	outPageSwarm: function(e) {
		this.onFocus = false;
		//this.animateOpacity('.4');
	},

	animateOpacity: function(num) {
		if(this.sliding == false && this.appStatus == 'open') {
			this.$el.stop();
			this.$el.animate({
				'opacity' : num
			}, 300, _.bind(function() {
			
			}, this));
		}
	},

	initialize: function () {		
		this.render();		
	},

	render: function () {

		PS.Models.MenuModel = new MenuModel(); 
		PS.Views.MenuView  = new MenuView({
			model : PS.Models.MenuModel
		});	
		this.$el.append(PS.Views.MenuView.$el);	


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

		this.sliding = true;
		this.$el.stop();
		this.$el.animate({
			'right' : '-' + (parseInt(PS.Views.MenuView.menuWidth) + 450).toString() + 'px'
		}, 300, _.bind(function() {
			this.sliding = false;
			this.appStatus = 'closed';
			PS.Views.TabView.open();

			//chrome.runtime.sendMessage({'appStatus': { status : 'close' } }, function(){});
			chrome.storage.local.set({'appStatus': { status : 'close' } }, function(){});	

		}, this));	
	},

	open: function() {
		this.sliding = true;
		this.$el.css({'opacity': '1'});
		this.$el.stop();
		this.$el.animate({
			'right' : '0'
		}, 300, _.bind(function() {
			this.sliding = false;
			this.appStatus = 'open';

			//chrome.runtime.sendMessage({'appStatus': { status : 'open' } }, function(){});
			chrome.storage.local.set({'appStatus' : { status : 'open' } }, function(){});		

		}, this));
	},


	hide: function() {
		this.$el.css({'right':'-550px'});
		PS.Views.TabView.show();	
	},

	show: function(){
		this.$el.css({'right':'0'});
		PS.Views.TabView.hide();	
	},

	destroy : function() {

	}

});