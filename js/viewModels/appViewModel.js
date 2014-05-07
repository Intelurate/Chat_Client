


var AppModel = Backbone.Model.extend({

	initialize: function () {

	},

	fetch : function() {

	}

});



var AppView = Backbone.View.extend({

	className : 'chatA99',

	events: {
		//'click #toggle-all': 'toggleAllComplete'
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.contentView = new ContentView({
			model : new ContentModel(),
			parent : this			
		});		
		this.headerView = new HeaderView({
			model : new HeaderModel(),
			parent : this
		});
		this.$el.append(this.headerView.$el);


		this.$el.append(this.contentView.$el);
	
	},

	destroy : function(){

	}

});