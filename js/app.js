(function(){
	"use strict";
	var app = {

		article: null,

		init:function(){

			app.listeners();
			this.appelAlice();
			this.json();
		},

		listeners:function(){
			$('#btn').on('click', this.appelAlice.bind(this));
			$('#').on('click', this.json.bind(this));
		},
			

		appelAlice:function(){
			var url = "http://192.168.1.40:1337/alice.md";
			$.ajax(url).done(this.ajaxDone);
		},

		ajaxDone: function(data){
			app.listeners();
			this.article = data;
			var alice = new showdown.Converter(),
			text = this.article,
			html = alice.makeHtml(text);
			console.log(html);

			$('#md').html(html);
		},

		json: function(){
			var url = "http://192.168.1.40:1337/menu.json";
			$.ajax(url).done(this.ajxDone);

		},
		ajxDone: function(data){
			app.listeners();
			for(var i = 0; i < data.menu.length; i++){
				var title = data.menu[i].title;
				$('#titre').append('<button id="btn'+i+'">'+ title +'</button>');
			
				}
		},




	};


	$(document).ready(function(){
		app.init();
	});
})();