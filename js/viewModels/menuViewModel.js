


var MenuModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {		

	}

});



var MenuView = Backbone.View.extend({

	className : 'page_swarm_menu',

	events: {

	},

	userDisplayStatus: 'close',

	currentMenuType : '',

	menuWidth : 0,

	initialize: function () {
		this.render();
	},

	render: function () {

	},

	toggle: function(menuType) {
		if(this.currentMenuType == menuType) {
			this.currentMenuType = '';
			this.menuWidth = 0;
			this.close();
		}else{			
			this.currentMenuType = menuType;
			this.loadMenu(this.currentMenuType);
		}
	},

	loadMenu: function(menuType) {

		if(!PS.Models[menuType+"MenuView"]) {
			PS.Models[menuType+"MenuModel"] = new window[menuType+"MenuModel"]();
			PS.Views[menuType+"MenuView"] = new window[menuType+"MenuView"]({
				model: PS.Models[menuType+"MenuModel"] 
			});
			
			PS.Views[menuType+"MenuView"].render();
			this.$el.empty().append(PS.Views[menuType+"MenuView"].$el);
		}else{

			PS.Views[menuType+"MenuView"].render();
			this.$el.empty().append(PS.Views[menuType+"MenuView"].$el);
		}

		this.menuWidth = PS.Views[menuType+"MenuView"].width;		
		this.open(this.menuWidth);

	},

	open: function(width) {
		this.$el.stop();
		this.$el.animate({
			'width' : width+'px'
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