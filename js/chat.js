chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if(request.chatid) {

		var chatId = request.chatid;

		if(request.action == "hidechat") {
			$('body').find('.chatA99').hide();
		} else if(request.action == "showchat") {
			$('body').find('.chatA99').show();
			if($('.chatA99').hasClass('minimized')) {
				$('.chatA99').removeClass('minimized');
			}
		} else if(request.action == "loadchat") {
			
			//window.socketX = io.connect('ws://flock.ethamatics.com/');
			
			window.socketX = io.connect('ws://localhost:8000/');
			
			//window.socketX = io.connect('ws://66.176.176.233:1337');
			//window.socketX = io.connect('ws://54.187.145.152'); 

			//get current connection
			var url = document.URL.split('#');
			window.room = url[0];
			window.room = MD5(room);

			var chatApp = new AppView();
			$('body').prepend(chatApp.$el);

		}
	}
});


