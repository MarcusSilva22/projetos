(function(){
  "use strict";

  angular.module("myApp").controller("initLogin", function($scope, Data, $ionicModal, $location, DBLocal){
    $scope.loginUsuario = function(login){
      console.log(login);
    }
  })
})();
