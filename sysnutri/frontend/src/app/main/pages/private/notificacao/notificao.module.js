(function ()
{
    'use strict';

    angular
            .module('app.pages.private.notificacao', [
                'app.pages.private.notificacao.notificacaoController',
                'app.pages.private.notificacao.notificacaoService'
            ])
            .config(config)

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
                .state('app.notificacao', {
                    url: '/notificacao',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/notificacao/notificacao.html',
                            controller: 'NotificacaoController as ctrl',
                        }
                    }
                });

                msNavigationServiceProvider.saveItem('notificacao', {
                    title: 'Notificação',
                    icon: 'icon-cellphone-link',
                    state: 'app.notificacao'
                });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/private/notificacao');
    }
})();
