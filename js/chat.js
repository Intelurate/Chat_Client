

	var url = document.URL.split('#');

	var PS = {
		Views : {},
		Models : {},
		//socket : io.connect('ws://localhost:8888/'),
		socket : io.connect('ws://app.pageswarm.com/'),
		room : MD5(url[0])
	};

	//get current connection

	/*
	var test = (function(){self.onmessage=function(e){ var now = new Date().getTime();while(new Date().getTime() < now + 4000) {}	this.postMessage(e.data); }})();
	
	// "Server response", used in all examples
	var response = "(function(){self.onmessage=function(e){ var now = new Date().getTime();while(new Date().getTime() < now + 4000) {}	this.postMessage(e.data); }})()";
	
	var blob;

	try {
	    blob = new Blob([response], {type: 'application/javascript'});
	} catch (e) { // Backwards-compatibility
	    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
	    blob = new BlobBuilder();
	    blob.append(response);
	    blob = blob.getBlob();
	}
	var worker = new Worker(URL.createObjectURL(blob));

	worker.onmessage = function(e) {
		alert('Worker said: ' + e.data.name);
	}
	worker.postMessage({ 'name' : 'eddie' });
	*/

	PS.Views.AppView = new AppView();
	$('body').prepend(PS.Views.AppView.$el);





