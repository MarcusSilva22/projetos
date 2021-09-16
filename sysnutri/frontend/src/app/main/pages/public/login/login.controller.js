(function ()
{
    'use strict';

    angular
        .module('app.pages.public.login.loginController',[])
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(){
        LoginController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));
    }

    LoginController.prototype.teste = function() {

    };
})();
