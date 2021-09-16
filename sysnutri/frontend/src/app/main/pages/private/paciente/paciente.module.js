(function ()
{
    'use strict';

    angular
            .module('app.pages.private.paciente', [
                'app.pages.private.paciente.pacienteController',
                'app.pages.private.paciente.incluirPacienteController',
                'app.pages.private.paciente.editarPacienteController',
                'app.pages.private.paciente.visualizarPacienteController',
                'app.pages.private.paciente.pacienteService'
            ])
            .config(config)

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {


        // State
        $stateProvider
                .state('app.paciente', {
                    url: '/paciente',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/paciente/pesquisa.html',
                            controller: 'PacienteController as ctrl',
                        }
                    }
                })
                .state('app.paciente.incluir', {
                    url: '/incluir',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/paciente/paciente.html',
                            controller: 'IncluirPacienteController as ctrl',
                        }
                    }
                })
                .state('app.paciente.editar', {
                    url: '/:id/editar',
                    params:{
                        paciente : null
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/paciente/paciente.html',
                            controller: 'EditarPacienteController as ctrl',
                        }
                    }
                })
                .state('app.paciente.visualizar', {
                    url: '/:id/visualizar',
                    params:{
                        paciente : null
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/pages/private/paciente/paciente.html',
                            controller: 'VisualizarPacienteController as ctrl',
                        }
                    }
                });

                msNavigationServiceProvider.saveItem('pacientes', {
                    title: 'Paciente',
                    icon: 'icon-account',
                    state: 'app.paciente'
                });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/private/paciente');
    }
})();
