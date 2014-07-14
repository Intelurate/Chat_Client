


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

		//chrome.storage.sync.remove('appStatus', _.bind(function(result) {}));

		chrome.storage.sync.get('appStatus', _.bind(function(result) {

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

	reRender : function() {

	},

	destroy : function(){

	}

});