$(function() {

	if(!window.PSLiveLinks) {

		window.PSLiveLinks = {
			urls : []
		};

//		window.PSLiveLinks.socket = io.connect('https://app.pageswarm.com/', { secure: true } );

		window.PSLiveLinks.socket = io.connect('http://localhost:8888/'),

		window.PSLiveLinks.getSearchresults = function() {

			var intervalCheck;

			intervalCheck = setInterval(function() {	

				window.PSLiveLinks.searchRecords = $('body').find('li.g .rc h3.r');
				window.PSLiveLinks.urls = [];
				window.PSLiveLinks.findLinks = {};

				for(var a = 0; a<window.PSLiveLinks.searchRecords.length; a++) {			
					var url = $(window.PSLiveLinks.searchRecords[a]).find('a').attr('href');
					if(url) {							
						clearInterval(intervalCheck);				
						var room = MD5(url.toString());						
						window.PSLiveLinks.socket.emit('getuserconnections', { room : room, index : a });
						window.PSLiveLinks.urls.push({ room : url });
					}
				}

			}, 300);
	
		}

		window.PSLiveLinks.socket.on('showconnections', function (room) {

			var users = _.keys(room.users);			
			var userCount = users.length;
			var index = room.index;		
			$('body').find('h3.r:eq('+index+')').prepend('<div class="googleSearchStat"><img src="'+chrome.extension.getURL("/images/icon.png")+'" width="16" /><p>'+userCount+'</p></div>');


			if(users.length > 0) {
				//console.log(room.users)
			}else{
				//console.log('fickkckckkck!!!')
			}

			//var room = window.PSLiveLinks.findLinks[room];
			//room.prepend('<div class="googleSearchStat"><img src="'+chrome.extension.getURL("/images/icon.png")+'" width="16" /><p>'+userCount+'</p></div>');
				

			/*	
			if($('body').attr('swarm') != 'searched') {
				$('body').attr('swarm', 'searched');

				for(var a = 0; a<window.PSLiveLinks.urls.length; a++) {													
					$('body').find('h3.r:eq('+a+')').prepend('<div class="googleSearchStat"><img src="'+chrome.extension.getURL("/images/icon.png")+'" width="16" /><p>'+urls[a].count+'</p></div>');
				}
			}else{
				for(var a = 0; a<window.PSLiveLinks.urls.length; a++) {													
					$('body').find('h3.r:eq('+a+')').prepend('<div class="googleSearchStat"><img src="'+chrome.extension.getURL("/images/icon.png")+'" width="16" /><p>'+urls[a].count+'</p></div>');
				}
			}*/

		});

		window.PSLiveLinks.getSearchresults();

		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if(request.loadUrls) {
				window.PSLiveLinks.getSearchresults();			
			}
		});
	}


});



