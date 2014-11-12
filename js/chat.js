
var url = document.URL.split('#');
	url = url[0]

String.prototype.insertAt=function(index, string) { 
	return this.substr(0, index) + string + this.substr(index);
}

window.PS = {
	Views : {},
	Models : {}
};

chrome.runtime.onMessage.addListener(_.bind(function(request, sender, sendResponse) {

	if(request.update_data) {

		var room = MD5(request.update_data);
		PS.Url = request.update_data;
		PS.room = room;

		if(PS.socket) {
			PS.socket.io.disconnect();
			PS.socket.io.reconnect();
		}else{
			PS.socket = io('http://localhost:8889/')
		}

		if(!PS.Views.PSAppView) {

			PS.Views.PSAppView = new PSAppView({
				model : new PSAppModel()
			});	
			$('body').append(PS.Views.PSAppView.$el);	

		}else{

			PS.Views.PSAppView.render();
		}
	}

}, this));


