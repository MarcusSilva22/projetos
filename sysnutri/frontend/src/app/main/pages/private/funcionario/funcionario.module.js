(function ()
{
    'use strict';

    angular
            .module('app.pages.private.funcionario', [
                'app.pages.private.funcionario.funcionarioController',
                'app.pages.private.funcionario.incluirFuncionarioController',
                'app.pages.private.funcionario.editarFuncionarioController',
                'app.pages.private.funcionario.visualizarFuncionarioController',
                'app.pages.private.funcionario.funcionarioService'
            ])
            .config(config)

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
                .state('app.funcionario', {
                    url: '/funcionario',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/funcionario/pesquisa.html',
                            controller: 'FuncionarioController as ctrl',
                        }
                    }
                })
                .state('app.funcionario.incluir', {
                    url: '/incluir',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/funcionario/funcionario.html',
                            controller: 'IncluirFuncionarioController as ctrl',
                        }
                    }
                })
                .state('app.funcionario.editar', {
                    url: '/:id/editar',
                    params:{
                        funcionario : null
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/funcionario/funcionario.html',
                            controller: 'EditarFuncionarioController as ctrl',
                        }
                    }
                })
                .state('app.funcionario.visualizar', {
                    url: '/:id/visualizar',
                    params:{
                        funcionario : null
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/funcionario/funcionario.html',
                            controller: 'VisualizarFuncionarioController as ctrl',
                        }
                    }
                });

                msNavigationServiceProvider.saveItem('funcionarios', {
                    title: 'Funcionário',
                    icon: 'icon-worker',
                    state: 'app.funcionario'
                });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/private/funcionario');
    }
})();
