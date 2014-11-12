$(function() {

	if(!window.PSLiveLinks) {

		window.PSLiveLinks = {
			urls : []
		};

		window.PSLiveLinks.socket = io.connect('https://app.pageswarm.com/', { secure: true } );

		window.PSLiveLinks.getSearchresults = function() {

			setTimeout(function() {	

				window.PSLiveLinks.searchRecords = $('body').find('.homepage ul.river li h2.post-title');				
				window.PSLiveLinks.urls = [];
				for(var a = 0; a<window.PSLiveLinks.searchRecords.length; a++) {			
					var url = $(window.PSLiveLinks.searchRecords[a]).find('a').attr('href');
					if(url) {					
						window.PSLiveLinks.urls.push({ room : MD5(url.toString()) });
					}
				}
				window.PSLiveLinks.socket.emit('geturlconnections', window.PSLiveLinks.urls);
			}, 500);
	
		}
		
		window.PSLiveLinks.socket.on('showurlconnections', function (urls) {

			if($('body').attr('swarm') != 'searched') {
				$('body').attr('swarm', 'searched');
				for(var a = 0; a<window.PSLiveLinks.urls.length; a++) {													
					$('body').find('.homepage ul.river li h2.post-title:eq('+a+')').prepend('<div class="googleSearchStat"><img src="'+chrome.extension.getURL("/images/icon.png")+'" /><p>'+urls[a].count+'</p></div>');
				}
			}else{
				for(var a = 0; a<window.PSLiveLinks.urls.length; a++) {													
					$('body').find('.homepage ul.river li h2.post-title:eq('+a+')').prepend('<div class="googleSearchStat"><img src="'+chrome.extension.getURL("/images/icon.png")+'" /><p>'+urls[a].count+'</p></div>');
				}
			}
		});

		window.PSLiveLinks.getSearchresults();

		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if(request.loadUrls) {
				window.PSLiveLinks.getSearchresults();			
			}
		});
	}


});



