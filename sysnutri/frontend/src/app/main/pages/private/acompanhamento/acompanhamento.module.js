(function ()
{
    'use strict';

    angular
            .module('app.pages.private.acompanhamento', [
                'app.pages.private.acompanhamento.acompanhamentoController',
                'app.pages.private.acompanhamento.incluirAcompanhamentoController',
                'app.pages.private.acompanhamento.editarAcompanhamentoController',
                'app.pages.private.acompanhamento.visualizarAcompanhamentoController',
                'app.pages.private.acompanhamento.acompanhamentoService'
            ])
            .config(config)

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {


        // State
        $stateProvider
                .state('app.acompanhamento', {
                    url: '/acompanhamento',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/acompanhamento/pesquisa.html',
                            controller: 'AcompanhamentoController as ctrl',
                        }
                    }
                })
                .state('app.acompanhamento.incluir', {
                    url: '/incluir',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/acompanhamento/acompanhamento.html',
                            controller: 'IncluirAcompanhamentoController as ctrl',
                        }
                    }
                })
                .state('app.acompanhamento.editar', {
                    url: '/:id_acompanhamento/editar',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/acompanhamento/acompanhamento.html',
                            controller: 'IncluirAcompanhamentoController as ctrl',
                        }
                    }
                })
                .state('app.acompanhamento.visualizar', {
                    url: '/:id/visualizar',
                    params:{
                        acompanhamento : null
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/acompanhamento/acompanhamento.html',
                            controller: 'VisualizarAcompanhamentoController as ctrl',
                        }
                    }
                });

                msNavigationServiceProvider.saveItem('acompanhamentos', {
                    title: 'Acompanhamento',
                    icon: 'icon-folder-account',
                    state: 'app.acompanhamento'
                });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/private/acompanhamento');
    }
})();
