

	var url = document.URL.split('#');

	var PS = {
		Views : {},
		Models : {},
		socket : io.connect('ws://localhost:8000/'),
		room : MD5(url[0])
	};

	//window.socketX = io.connect('ws://flock.ethamatics.com/');
	//window.socketX = io.connect('ws://localhost:8000/');
	//window.socketX = io.connect('ws://66.176.176.233:1337');
	//window.socketX = io.connect('ws://54.85.103.208'); 

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

	window.page_swarm = new AppView();
	$('body').prepend(window.page_swarm.$el);





