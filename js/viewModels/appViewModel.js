


var AppModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {
		chrome.runtime.onMessage.addListener(_.bind(function(request, sender, sendResponse) {
			switch(request.command) {
				case 'userleftroom':
					this.set({ 'userleftroom' : { data : request.data } });
				break;		
				case 'userentersroom':
					this.set({ 'userentersroom' : { data : request.data } });
				break;
			}
		}, this));
	}

});



var AppView = Backbone.View.extend({

	className : 'page_swarm',

	events: {
		'mouseover': 'appEnter',
		'mouseout': 'appLeave',
	},

	initialize: function () {
		this.listenTo(this.model, "change:userleftroom", this.userLeftRoom);
		this.listenTo(this.model, "change:userentersroom", this.userEntersRoom);
		this.render();
	},

	userLeftRoom: function () {
		var userleftroom = this.model.toJSON().userleftroom;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(userleftroom.data.count);
		PS.Views.StatusView.updateStatus(userleftroom.data.user.username + " has left the discussion...");
	},

	userEntersRoom: function () {
		var userentersroom = this.model.toJSON().userentersroom;
		PS.Views.HeaderView.$el.find('.connections .connection_count').text(userentersroom.data.count);
		PS.Views.StatusView.updateStatus(userentersroom.data.user.username + " has entered the discussion...");
	},	
	
	appEnter: function(e) {
		e.stopPropagation();
	},

	appLeave: function(e) {
		e.stopPropagation();
	},

	render: function () {

		PS.Models.StatusModel = new StatusModel();
		PS.Views.StatusView = new StatusView({
			model : PS.Models.StatusModel
		});
		this.$el.empty().append(PS.Views.StatusView.$el);

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

			this.checkLock();

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
					//PS.socket.emit('changeconnection', { "room" : PS.room });
					PS.Views.ContentView.startChat(PS.user);
				}
			}
		}, this));

		this.checkLock();
	},

	checkLock: function() {
		chrome.storage.local.get('toggle_lock', function(result) {

			if(result.toggle_lock) {
				if(result.toggle_lock.locks) {
					var host = MD5(window.location.host);
					if(!result.toggle_lock.locks[host]) {
						$('body').find('.page_swarm').css({'display':'block'});
					}else{
						$('body').find('.page_swarm').css({'display':'none'});
					}
				}
			}else{
				$('body').find('.page_swarm').css({'display':'block'});
			}
		});
	},

	toggleLock: function() {
	
		chrome.storage.local.get('toggle_lock', function(result) {
	
			var locks = {};
			if(result.toggle_lock) {
				if(result.toggle_lock.locks) {
					locks = result.toggle_lock.locks;
				}
			}

			var host = MD5(window.location.host);
			
			if(locks[host]) {
				if(locks[host] == 'locked') {
					delete locks[host];
					$('body').find('.page_swarm').css({'display':'block'})
				}else{
					//PS.socket.emit('changeconnection', { "room" : PS.room });
					locks[host] = 'locked';
					$('body').find('.page_swarm').css({'display':'none'})
				}
			}else{
				locks[host] = 'locked';
				//PS.socket.emit('changeconnection', { "room" : PS.room });
				$('body').find('.page_swarm').css({'display':'none'})						
			}

			chrome.storage.local.set({ 'toggle_lock' : { locks : locks } }, function() {
			});
		});
	},

	reRender : function() {

	},

	destroy : function(){

	}

});










