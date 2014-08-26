

var url = document.URL.split('#');
	url = url[0]

String.prototype.insertAt=function(index, string) { 
  return this.substr(0, index) + string + this.substr(index);
}

var PS = {
	Views : {},
	Models : {},
	room : MD5(url)
};


PS.Views.AppView = new AppView({
	model : new AppModel()
});
$('body').prepend(PS.Views.AppView.$el);





