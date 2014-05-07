//var domain = "http://flock.ethamatics.com/";
var domain = "http://localhost:8000/";

var headerBar = [			
		'<div class="logo">',
			'<img src="'+domain+'images/message_board.png" width="30"/>',
		'</div>',
		'<div class="logo_name"></div>',
		'<div class="toggle">',
			'<img class="plus_icon" src="'+domain+'images/plus_icon.png" width="20"/>',
			'<img class="minus_icon" src="'+domain+'images/minus_icon.png" width="20"/>',
		'</div>',
		'<div class="connections"><span class="connection_count"></span> <span class="connections_txt">connections</span></div>'									
];
ich.addTemplate('headerBar', headerBar.join(''));

var chatStart = [
	'<div class="chatstart">',
		'<p>Enter a Username</p>',
		'<input class="username" type="text" />',
	'</div>'
];
ich.addTemplate('chatStart', chatStart.join(''));

var chatArea = [
	'<div class="chatarea">',	
		'<div>',												
			'<div class="message">',
				'<textarea rows="4" class="data"></textarea>',
			'</div>',
			'<div class="conversation_holder"><div class="conversation"><div class="spacer"></div></div></div>',
			//'<img src="http://mysocket.so:8000/images/active_status.png"/>',
		'</div>',
	'</div>'
];
ich.addTemplate('chatArea', chatArea.join(''));

//var updateChat = ['<p><strong>'+updatechat.username+':</strong><span class="date"> ('+createdDate.trim()+') </span></br><span>'+updatechat.data+'</span></p>'

var updateChat = ['<p><strong>{{username}}:</strong>' +
		'<span class="date"> ({{date}}) </span></br>' + 
		'<span>{{data}}</span></p>'];
ich.addTemplate('updateChat', updateChat.join(''));


