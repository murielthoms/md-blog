
(function(){
	"use strict";
	var app = {
		urlBase:"http://192.168.1.40:1337/",
		urlJson:"menu.json",


		init:function(){
			$.ajax(this.urlBase + this.urlJson).done(this.doneSuccess.bind(this)).fail(this.failError);
		
		},

		doneSuccess: function(data){
			for(var i = 0; i < data.menu.length; i++) {
				var article = data.menu[i];
				var liens = '<li><a href="#" class="linkArticle" data-path="'+
				article.path+'">' + article.title + '</a></li>';
				console.log(article);
				$('#link').append(liens);
			}
			$('.linkArticle').click(this.clickLien);
			
		},
		

		clickLien: function(){
			var transformJquery = $(this);
			var path = transformJquery.data('path');
			console.log(path);
			$.ajax(app.urlBase + path).done(function(data){
				var converter = new showdown.Converter();
				var html = converter.makeHtml(data);
				$('#md').html(html);
				console.log(html);
			});
		},
		failError: function(){	
			console.log('erreur');
		},
	};

	$(document).ready(function(){

		app.init();   

	});
})();
