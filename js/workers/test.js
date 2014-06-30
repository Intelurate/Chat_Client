

onmessage = function(e) {

	var now = new Date().getTime();
	while(new Date().getTime() < now + 2000) {}	
	this.postMessage(e.data);

}