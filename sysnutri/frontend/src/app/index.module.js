(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [
            'app.core',
            'app.pages.public.login',
            'app.navigation',
            'app.toolbar',
            'app.pages'
        ]);
})();
