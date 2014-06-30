


var TabModel = Backbone.Model.extend({

	initialize: function () {

	},

	fetch : function() {

	}

});



var TabView = Backbone.View.extend({

	className : 'page_swarm_tab',

	events: {
		//'mousedown' : 'moveTab',
		//'mouseup' : 'placeTab',
		'click' : 'openPageSwarm'
	},

	status : true,

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.append('<div class="tab_icon"></div>');
		this.$el.find('.tab_icon').css({
			'background-image' : 'url(' + chrome.extension.getURL("/images/page_swarm_tab_icon.png") + ')'
		});

	},

	openPageSwarm:function() {
		if(this.status == true) {
			this.close();
		}
	},

	open: function() {
		this.$el.stop();
		this.$el.animate({
			'right' : '0'
		}, 300, function() {

		});	
	},

	close: function (argument) {
		this.$el.stop();
		this.$el.animate({
			'right' : '-70'
		}, 300, _.bind(function() {
			PS.Views.DiscView.open();
		}, this));		
	},

	moveTab: function() {

		$('body').mousemove(_.bind(function( event ) {
			this.$el.css({
				top: (event.pageY - 20)
			});
		},this));
	},

	placeTab: function() {
		$('body').unbind('mousemove');
	},

	destroy : function() {

	}

});