(function ()
{
    'use strict';

    angular
        .module('app.pages.private', [
            'app.agenda',
            'app.pages.private.paciente',
            'app.pages.private.funcionario',
            'app.pages.private.notificacao',
            'app.pages.private.acompanhamento'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider, $translatePartialLoaderProvider)
    {
        // Navigation
        // msNavigationServiceProvider.saveItem('pages', {
        //     title : 'PAGES',
        //     group : true,
        //     weight: 2
        // });
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/private');
    }
})();
