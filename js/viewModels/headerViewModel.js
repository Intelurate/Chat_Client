

var HeaderModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {
		var scope = this;
		window.socketX.on('showcurrentconnections', function (usersCount) {	
			scope.set({ 'showcurrentconnections' : { 'usersCount' : usersCount } });			
			//$('body').find('.chatapp .header_bar .connections .connection_count').text(users.count);
		});
	}

});



var HeaderView = Backbone.View.extend({
	
	className : 'header_bar',

	events: {
		'click .toggle': 'toggleAllComplete'
	},

	toggleAllComplete : function(e) {
		if(this.parent.$el.hasClass('minimized')) {
			this.parent.$el.removeClass('minimized');
		} else {
			this.parent.$el.addClass('minimized');
		}
	},

	initialize: function (d) {
		this.parent = d.parent;
		this.parent.contentView.statusView.startConnectingStatus();
        this.listenTo(this.model, "change:showcurrentconnections", this.showCurrentConnections);
		window.socketX.emit('getcurrentconnections', { "room" : window.room });
		this.render();

	},

	showCurrentConnections : function() {	
		
		this.parent.contentView.statusView.$el.empty();
		this.parent.contentView.$el.append(ich.chatStart());
		var usersCount = this.model.toJSON().showcurrentconnections.usersCount;		
		this.$el.find('.connections .connection_count').text(usersCount);
	},

	setUpdatedConnections : function(count) {	
		this.$el.find('.connections .connection_count').text(count);
	},

	render: function () {
		this.$el.append(ich.headerBar());
	},

	destroy : function() {

	}

});