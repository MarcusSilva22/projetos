(function ()
{
    'use strict';

    angular
        .module('app.pages.public.login', ['app.pages.public.login.loginController'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider){
        // State
        $stateProvider.state('app.login', {
            url      : '/login',
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.login': {
                    templateUrl: 'app/main/pages/public/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login-v2'
        });
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/public/login');
    }

})();
