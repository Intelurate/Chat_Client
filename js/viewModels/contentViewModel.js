
//username
var ContentModel = Backbone.Model.extend({

	initialize: function () {
		this.fetch();
	},

	fetch : function() {

		PS.socket.on('shownewuser', _.bind(function (d) {			
			this.set({ 'shownewuser' : { data : d }});
		}, this));
		PS.socket.on('verifyconnection', _.bind(function (d) {	
			this.set({ 'verifyconnection' : { data : d }});
		}, this));
		PS.socket.on('updatechat', _.bind(function (d) {
			this.set({ 'updatechat' : { data : d }});
		}, this));
		PS.socket.on('selfdisconnected', _.bind(function (d) {		
			this.set({ 'selfdisconnected' : { data : d }});
		}, this));
		PS.socket.on('sendpaging', _.bind(function (d) {		
			this.set({ 'sendpaging' : { data : d }});
		}, this));
		PS.socket.on('userdisconnected', _.bind(function (d) {			
			this.set({ 'userdisconnected' : { data : d }});
		}, this));

	}
});

var ContentView = Backbone.View.extend({
	
	className : 'page_swarm_contents',

	events: {
		'keydown .usernameForm .username': 'chatStart',
		'click .usernameForm .join_btn': 'chatStart',		
		'keydown .chatarea .data': 'sendChat',		
		'click .facecon' : 'addFaceIcon',
		'click .avatars ul.avatar_list li' : 'selectAvatar',
		'mousedown .avatar_header .random_avatar' : 'holdRandomAvatar',
		'mouseup .avatar_header .random_avatar' : 'releaseRandomAvatar',
		'scroll' : 'scrolling'
	},

	holdRandomAvatar : function(e) {

	},
	
	releaseRandomAvatar : function(e) {
		
	},


	page : 0,

	added : 0,
	
	loadingPage : false,

	initialize: function (d) {

		this.listenTo(this.model, "change:verifyconnection", this.verifyConnection);
		this.listenTo(this.model, "change:updatechat", this.updateChat);
		this.listenTo(this.model, "change:selfdisconnected", this.selfDisconnected);
        this.listenTo(this.model, "change:sendpaging", this.sendPaging);         
        this.listenTo(this.model, "change:userdisconnected", this.userDisconnected);
		this.render();

		this.$el.append('<div class="wait_loader"><img src="'+chrome.extension.getURL("/images/wait_loader.gif")+'" /></div>');

	},

	render: function () {

		chrome.storage.local.get('user', _.bind(function(result) {
			if(result.user) {
				if(result.user.username) {
					this.startChat(result.user);
					PS.user = result.user;
				}else{
					this.loadUserNameForm();
				}
			}else{
				this.loadUserNameForm();
			}
			PS.Views.MenuView.loadMenu('Users');

		}, this));

	},

	selectAvatar: function(e) {
		var target = $(e.currentTarget);		
		var selected = this.$el.find('.avatar_selected');
		selected.removeClass('avatar_selected');
		target.addClass('avatar_selected');

		var picUrl = target.attr('avatar_link');
		this.$el.find('.avatar_select_display').empty().
				append('<img width="40" src="http://avatars.pageswarm.com/'+picUrl+'" />');

	},

	holdRandomAvatarInterval : null,

	holdRandomAvatar : function(e) {

		this.randomAvatarGenerator();
		var time = 500;
		this.holdRandomAvatarInterval = setInterval(_.bind(function() {
			time = 100;
			this.randomAvatarGenerator();
		}, this), time);

	},
	
	releaseRandomAvatar : function(e) {
		clearInterval(this.holdRandomAvatarInterval);
	},

	randomAvatarGenerator : function() {
		var randomAvatar = Math.floor( (Math.random() * this.avatar_list.length) + 1); 
		var id = this.avatar_list[randomAvatar].id;
		this.$el.find('#'+id).trigger('click');
	},

	createNewUser: function() {
		this.loadUserNameForm();		
	},

	addFaceIcon: function (e) {

		var target = $(e.currentTarget);

		var classes = target.attr('class').split(' ');

		for(c in classes) {			

			if(classes[c].indexOf('icon-') != -1) {				

				var icon = classes[c].split('icon-')[1];
				var d = this.$el.find('.data');
				var pos = d.caret('pos');
				var val = d.val();			

				var emotocons = {
					'Laughing' : '(:-D)',
					'Kiss' : '(:-*)',
					'Innocent' : '(O:-)',
					'HeartEyes' : '(3-))',
					'Grin' : '(8-D)',
					'Frown' : '(:-()',
					'Footinmouth' : '(:-P)',
					'Embarrassed' : '(:-$)',
					'Cry' : '(:\'()',
					'Crazy' : '(}:-)',
					'Cool' : '(;-))',
					'Content' : '(|:-|)',
					'Confused' : '(?:-|)',
					'Angry' : '(>:-|)',
					'Ambivalent' : '(:-])'
				}

				var newText = val.insertAt(pos, emotocons[icon]);
				pos = pos + emotocons[icon].length;
				d.val(newText);

			    var elem = document.getElementById('swarm_chat');
			    if(elem != null) {
			        if(elem.createTextRange) {
			            var range = elem.createTextRange();
			            range.move('character', pos);
			            range.select();
			        } else {
			            if(elem.selectionStart) {
			                elem.focus();
			                elem.setSelectionRange(pos, pos);
			            }else{
			                elem.focus();
			            }
			        }
			    }

				break;
			}
		}
	},

	avatar_list : [],

	loadUserNameForm: function() {

		$.ajax({
			url: "http://avatars.pageswarm.com",
			context: document.body
		}).done(_.bind(function(d) {
			this.avatar_list = [];
			var nodes=d.documentElement.childNodes;

			var setFolder = undefined;


			var images = new Array();
			var imgCount = 0;

			for(n in nodes) {
				if(nodes[n].childNodes) {
					if(nodes[n].childNodes[0]) {
						if(nodes[n].childNodes[0].childNodes) {
							if(nodes[n].childNodes[0].childNodes[0]) {

								var link = nodes[n].childNodes[0].childNodes[0].nodeValue;
								var isJpg = link.indexOf(".jpg") == "-1" ? false : true;  
								var isGif = link.indexOf(".gif") == "-1" ? false : true;  
								var isPng = link.indexOf(".png") == "-1" ? false : true;

								if(isJpg || isGif || isPng) {									
									if(setFolder != undefined) {
										setFolder['folder_image'] = link;
										//avatar_list.push(setFolder);
										setFolder = undefined;
									}
									
									var image = new Image();
									images[imgCount] = new Image()
									images[imgCount].src = "http://avatars.pageswarm.com/" + link;
									imgCount++;

									this.avatar_list.push({ "avatar" : link, id : MD5(link) });
								}else{									
									setFolder = { "folder" : link };
								}							
							}
						}
					}
				}
			}

			this.$el.find('.chatarea').remove();
			this.$el.find('.usernameForm').remove();
			this.$el.append(ich.usernameForm({ "avatar_list" : this.avatar_list }));
			this.$el.find('.avatars').perfectScrollbar();
		
		}, this));
	},

	userNameLiveExist : function() {
		var usernameliveexist = this.model.toJSON().usernameliveexist;
		if(usernameliveexist.status) {
			PS.Views.StatusView.updateStatus("This username is currently being used in this discussion. If may also be getting this if you are already on this page in another tab.");
		}
	},

	sendPaging : function() {

		var conv = this.$el.find('.spacer'),
			sendpaging = this.model.toJSON().sendpaging,
			data = sendpaging.data,
			buildchat = [];

		if(data.items.length > 0) {
			for(d in data.items) {
				var date = new Date(data.items[d].created);
					createdDate = date.toString().split("GMT")[0].trim();	
					data.items[d].date = createdDate;

				var chat = data.items[d].chat;
					chat = atob(chat);

				var da = { 
					id : data.items[d]._id,
					username : data.items[d].username, 
					date : createdDate.trim(), 
					message : chat,
					avatar : data.items[d].avatar   
				};

				if(data.items[d].token == PS.user.token) {
					buildchat.push(ich.messagePostLeft(da));
				}else{
					buildchat.push(ich.messagePostRight(da));
				}
			}
			conv.before(buildchat);
			this.loadingPage = false;
		}
	},

	updateChat : function() {

		var updatechat = this.model.toJSON().updatechat.data.data;

		var date = new Date(updatechat.result.created);
			createdDate = date.toString().split("GMT")[0].trim();	

			console.log(updatechat)
			console.log(updatechat.result.chat)

			updatechat.result.chat = atob(updatechat.message);
		var da = { 
			id : updatechat.result._id,
			username : updatechat.result.username, 
			date : createdDate, 
			message : updatechat.result.chat,
			avatar : updatechat.result.avatar  
		};

		//_.invert(emotocons);
		this.$el.find('.conversation .empty_comments').remove();

		if(PS.user.username == updatechat.user.username && PS.user.token == updatechat.user.token) {			
			updatechat.username = updatechat.user.username;
			this.$el.find('.conversation').prepend(ich.messagePostLeft(da));
		}else{
			updatechat.username = updatechat.user.username;
			this.$el.find('.conversation').prepend(ich.messagePostRight(da));
		}

		this.$el.find('.conversation_holder').scrollTop(0);

		this.added = (this.added+1);
	},

	selfDisconnected : function() {
		
		var selfdisconnected = this.model.toJSON().selfdisconnected;

		console.log(selfdisconnected);

		PS.Views.HeaderView.$el.find('.connections .connection_count').text(selfdisconnected.data.count);
		PS.Views.StatusView.updateStatus("Your user have been disconnected from the discussion...");
		this.createNewUser();
	},

	emptyChatBox : function() {
		this.$el.empty();
		this.render();
	},

	getSavedChat : function(getsavedchat) {

		var conv = this.$el.find('.conversation');
		
		var data = getsavedchat;
		var buildchat = [];

		if(data.length > 0) {
			for(d in data) {

				var date = new Date(data[d].created);
				createdDate = date.toString().split("GMT")[0].trim();	
				data[d].date = createdDate;

				var chat = data[d].chat;					
					chat = atob(chat);

				var da = { 
					id : data[d]._id,
					username : data[d].username, 
					date : createdDate.trim(), 
					message : chat,
					avatar : data[d].avatar  
				};


				if(data[d].token == PS.user.token) {
					buildchat.push(ich.messagePostLeft(da));
				}else{
					buildchat.push(ich.messagePostRight(da));
				}
			}
			conv.empty().prepend(buildchat);
			this.page = (this.page+1);
		} else{
			buildchat.push('<p class="empty_comments">Be the first to comment on this page.</p>');
			conv.empty().prepend(buildchat.join(''));
		}		
	},

	sendChat : function(e) {

		e.stopPropagation();
		if(e.which == 13) {	
			e.preventDefault();
			var target = $(e.currentTarget);			
			var message = target.val();
	
			if(message != "") {

				message = message.replace(/<script>.*?<\/script>/g, ''); 				
				message = message.replace(/<script.*?>/g, ''); 			
				message = message.replace(/<script.*?\/>/g, ''); 
				message = message.replace(/<.*?>.*?<\/.*?>/g, ''); 

				message = message.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\?\/=?&?\/\w\.-]*)/g,
					function(match, p1, p2, p3, offset, string) {
					  var newUrl = "";
					  	if(p1) {
							newUrl = '<a target="_blank" href="'+match+'">'+match+'</a>';
	    				}else{
					  		newUrl = '<a target="_blank" href="http://'+match+'">'+match+'</a>';
					  	}
						return newUrl;
					});

				var emotocons = [
					{ icon : 'Laughing', code : '(:-D)' },
					{ icon : 'Kiss', code : '(:-*)' },
					{ icon : 'Innocent', code : '(O:-)' },
					{ icon : 'HeartEyes', code : '(3-))' },
					{ icon : 'Grin', code : '(8-D)' },
					{ icon : 'Frown', code : '(:-()' },
					{ icon : 'Footinmouth', code : '(:-P)' },
					{ icon : 'Embarrassed', code : '(:-$)' },
					{ icon : 'Cry', code : '(:\'()' },
					{ icon : 'Crazy', code : '(}:-)' },
					{ icon : 'Cool', code : '(;-))' },
					{ icon : 'Content', code : '(|:-|)' },
					{ icon : 'Confused', code : '(?:-|)' },
					{ icon : 'Angry', code : '(>:-|)' },
					{ icon : 'Ambivalent', code : '(:-])' }
				];

				var prevMessage = "";
				for(var i = 0; i < emotocons.length; i++) {
					prevMessage = message;
					message = message.replace(emotocons[i].code, '<img src="http://icons.pageswarm.com/'+emotocons[i].icon+'.png" class="emotocon" />')
					if(prevMessage != message) {
						i = i - 1;
					}
				}

				message = btoa(message);

				PS.socket.emit('sendchat', { room : PS.room, user : PS.user, avatar : PS.user.avatar, message : message });
				
				target.val("");
			}
		}
	},

	loadPage : function() {

		var url = document.URL.split('#');
		var room = url[0];
			room = MD5(room);
			this.page = (this.page+1);
		var paging = { page : this.page, skipped : this.added };
	
		PS.socket.emit('getpaging', { paging: paging, room : PS.room, user : PS.user });

	},

	verifyConnection : function() {

		var d = this.model.toJSON().verifyconnection.data;
		var usersCount = d.count;	
		PS.Views.HeaderView.setUserCount(usersCount);

		this.loadingPage = false;
		this.page = 0;

		var username = d.user.username;

		PS.Views.StatusView.updateStatus("You " + username + " are now connected to the page discussion...");
		this.$el.find('.usernameForm').remove();
		
		this.$el.empty().append(ich.chatArea());

		this.getSavedChat(d.items);

		this.$el.find('.conversation_holder').unbind('scroll');
		this.$el.find('.conversation_holder').perfectScrollbar().scroll(_.bind(function (e) {	
			var target = $(e.target);
			if(this.loadingPage == false) {
				if((target.scrollTop() + this.$el.find('.conversation_holder').height()) == 
					$('.conversation_holder').prop('scrollHeight') ) {
					this.loadingPage = true;
					this.loadPage();
				}
			}
		}, this));	
	},

	userDisconnected : function() {

		var d = this.model.toJSON().userdisconnected.data;
		var username = d.user.username;

		PS.Views.StatusView.updateStatus(username + " has disconnected from this discussion...");
		
	},

	chatStart : function(e) {
		if(e.which == 13 || e.which == 1) {

			var username = this.$el.find('.username').val();
			if(username.trim().length > 0) {
				var date = new Date();
				var token = MD5(date.getTime()+username); 			

				var avatar = this.$el.find('.avatar_selected');

				if(avatar.attr('id')) {
					var user = { "username" : username, 'token' : token, 'avatar' : avatar.attr('avatar_link') };
					chrome.storage.local.set({ 'user' : user }, _.bind(function() {
						PS.user = user;
						this.startChat(PS.user);				
					}, this));
				}else{
					alert('please select an avatar');
				}
			}	
		}
	},

	startChat : function(user) {
		PS.socket.emit('startconnection', { room : PS.room, user : user });
	},

	destroy : function() {

	}
	
});