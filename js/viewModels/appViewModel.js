


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
		//$('html, body').css({'overflow' : 'hidden'}); 
	},

	appLeave: function(e) {
		e.stopPropagation();
		//$('html, body').css({'overflow' : ''}); 
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



		//this.tabView = new TabView({
		//	model : new ContentModel(),
		//	parent : this			
		//});		

		/*
		this.contentView = new ContentView({
			model : new ContentModel(),
			parent : this			
		});		

		this.headerView = new HeaderView({
			model : new HeaderModel(),
			parent : this
		});

		this.$el.show();

		this.$el.append(this.headerView.$el);				
		this.$el.append(this.contentView.$el);
		*/

	},
/*
	displayApp : function(e) {
		this.animateOut();
	},
	
	appLeave : function(e) {
		this.animateIn();
	},

	animateOut : function() {
		this.$el.stop();
		this.$el.animate({
			'right' : '0'
		}, 300, function() {
			// Animation complete.
		});
	},

	animateIn : function() {
		lockStatus = this.headerView.getAppLockStatus();
		if(lockStatus == false) {
			this.$el.stop();
			this.$el.animate({
				'right' : '-350px'
			}, 300, function() {
				// Animation complete.
			});			
		}
	},

	appClick : function(e) {
		e.stopPropagation();
	},
	*/



	reRender : function() {
		/*
		var url = document.URL.split('#');
		window.room = url[0];
		window.room = MD5(room);
		this.contentView.emptyChatBox();
		this.headerView.model.toJSON().showcurrentconnections.usersCount = "";
		window.socketX.emit('changeconnection', { "room" : window.room });
		*/

	},

	destroy : function(){

	}

});