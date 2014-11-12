
var StatusModel = Backbone.Model.extend({
	
	initialize: function () {

	},

	fetch : function() {

	}

});



var StatusView = Backbone.View.extend({

	className : 'status',

	events: {
		'click': 'checkClick'
	},

	initialize: function () {
		this.render();
	},

	checkClick: function(e) {
		e.stopPropagation();
	},

	updateStatus : function(status_message) {

		this.$el.empty().append('<div class="status_message">'+status_message+'</div>');			

			this.$el.stop().css({ opacity : 1, display: 'block' });

			setTimeout(_.bind(function() {	

				this.$el.animate({
					opacity: 0,	
				}, 500, function() {
					$(this).empty();
					$(this).css({
						'display' : 'none',
						'opacity' : 1
					});
				});	

			}, this), 1000);	
	},
	
	startConnectingStatus : function() {
		this.$el.empty().text("connecting to server...");	
	},


	render: function () {
		
	},

	destroy : function(){

	}

});