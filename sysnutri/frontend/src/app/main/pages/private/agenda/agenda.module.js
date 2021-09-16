(function ()
{
    'use strict';

    angular
        .module('app.agenda', [
            'ui.calendar',
            'app.agenda.eventDetail',
            'app.agenda.eventForm',
            'app.pages.private.agenda.agendaService'
        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.agenda', {
            url      : '/agenda',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/pages/private/agenda/agenda.html',
                    controller : 'AgendaController as ctrl'
                }
            },
            bodyClass: 'calendar'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/private/agenda');

        // Navigation
         msNavigationServiceProvider.saveItem('agenda', {
            title : 'Agenda',
            icon: 'icon-calendar',
            state : 'app.agenda',
            weight: 2
        });
    }
})();
