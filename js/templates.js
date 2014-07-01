//var domain = "http://flock.ethamatics.com/";
var domain = "http://localhost:8000/";

//console.log(chrome);

var headerBar = [			
		'<div class="ps_icons left">',
			'<div class="ps_icon icon-export close_app" title="Minimizes Discussion"></div>',
			//'<img src="'+chrome.extension.getURL("/images/page_swarm_icon.png")+'" width="30"/>',
		'</div>',
		/*
		'<div class="logo_name"></div>',
		'<div class="toggle">',
			'<img class="plus_icon" src="'+chrome.extension.getURL("/images/plus_icon.png")+'" width="20"/>',
			'<img class="minus_icon" src="'+chrome.extension.getURL("/images/minus_icon.png")+'" width="20"/>',
		'</div>',
		*/

		'<div class="ps_icons right">',
			'<div class="ps_icon icon-list"  title="Displays Menu"></div>',
			'<div class="ps_icon icon-users users"  title="Availible Users Online"></div>',
			//'<img src="'+chrome.extension.getURL("/images/page_swarm_users_icon.png")+'" width="30"/>',

		'</div>',

		'<div class="connections"><span class="connection_count"></span> <span class="connections_txt">connections</span></div>'


];

ich.addTemplate('headerBar', headerBar.join(''));

var usernameForm = [
	'<div class="usernameForm">',
		'<p>Enter a Username</p>',
		'<input class="username" type="text" />',
	'</div>'
];
ich.addTemplate('usernameForm', usernameForm.join(''));

var chatArea = [
	'<div class="chatarea">',	
		'<div class="chat_wrapper">',												
			'<div class="message">',
				'<textarea rows="4" class="data"></textarea>',
			'</div>',
			'<div class="conversation_holder"><div class="conversation"><div class="spacer"></div></div></div>',
			//'<img src="http://mysocket.so:8000/images/active_status.png"/>',
		'</div>',
	'</div>'
];
ich.addTemplate('chatArea', chatArea.join(''));



var messagePostLeft = [
	'<div class="message_post left">', 
		'<p class="name"><strong>{{name}}</strong></p>',
		'<p class="message_data"><span class="date">({{date}})</span></br><span>{{message}}</span></p>',
	'</div>'
];

ich.addTemplate('messagePostLeft', messagePostLeft.join(''));

var messagePostRight = [
	'<div class="message_post right">', 
		'<p class="name"><strong>{{name}}</strong></p>',
		'<p class="message_data"><span class="date">({{date}})</span></br><span>{{message}}</span></p>',
	'</div>'
];

ich.addTemplate('messagePostRight', messagePostRight.join(''));

var updateChat = ['<p><strong>{{username}}:</strong>' +
		'<span class="date"> ({{date}}) </span></br>' + 
		'<span>{{data}}</span></p>'];
ich.addTemplate('updateChat', updateChat.join(''));



