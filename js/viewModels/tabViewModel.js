


var TabModel = Backbone.Model.extend({

	initialize: function () {

	},

	fetch : function() {

	}

});



var TabView = Backbone.View.extend({

	className : 'page_swarm_tab',

	events: {
		'mouseenter' : 'tabOver',
		'mouseleave' : 'tabOut',
		'click' : 'openPageSwarm'
	},

	status : true,

	initialize: function () {
		this.render();
	},

	tabOver: function() {
		PS.Views.DiscView.onFocus = true;
	},

	tabOut: function() {
		PS.Views.DiscView.onFocus = false;
	},

	render: function () {
		this.$el.append('<div class="tab_icon"></div>');
		this.$el.find('.tab_icon').css({
			'background-image' : 'url(' + chrome.extension.getURL("/images/page_swarm_tab_icon.png") + ')'
		});
		
		this.$el.draggable({ 

			axis : "y", 

			pastY: 0,

			drag: _.bind(function( event, ui ) {
				//var height = ui.position.top;
				//this.pastY = height;
			}, this),

			start: _.bind(function( event, ui ) {
				var height = ui.position.top;
				this.pastY = height;
				
				this.$el.stop();

			}, this),

			stop: _.bind(function( event, ui ) {

				event.stopPropagation();
				var windowHeight = $('html').height();
				var height = ui.position.top;
				var percentage = ((height/windowHeight) * 100);

				this.$el.removeAttr( 'style' ).css({'position':'absolute', 'right':'0', 'top':height })

				if(this.pastY < height) {			
					height = height + 15;
				}else{					
					height = height - 15;				
				}
	            this.$el.stop().animate({
	                top: height
	            },800, 'easeOutElastic', _.bind(function() {
	            },this));			

			}, this)

		});

	},

	openPageSwarm:function(e) {
		e.stopPropagation();
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


	hide: function() {
		this.$el.css({
			'right' : '70'
		});	
	},

	show: function () {
		this.$el.css({
			'right' : '0'
		});		
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