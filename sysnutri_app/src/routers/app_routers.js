(function(){
	"use strict";
	angular.module("myApp").config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise("/menu/home");

		$stateProvider

		.state("menu", {
			url:"/menu",
			templateUrl:"views/menu.html",
			abstract: true,
			controller: "initCtrl"
		})


		.state("pages.agenda.agenda", {
			url:"/agenda",
			views:{
				'menuContent':{
					templateUrl:"/pages/agenda/agenda"
				}
			}
		})
		.state("menu.login", {
			url:"/login",
			views:{
				'menuContent':{
					templateUrl:"views/login.html",
					controller: "initLogin"
				}
			}
		})

		.state("menu.perfil", {
			url:"/perfil",
			views:{
				'menuContent':{
					templateUrl:"views/perfil.html",
				}
			}
		})

		.state("menu.home.cadastro", {
			url:"/cadastro",
			templateUrl:"views/cadastro.html"

		});


	});
})();
