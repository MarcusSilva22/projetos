(function ()
{
    'use strict';

    angular
        .module('fuse')
        .factory('api', apiService);

    /** @ngInject */
    function apiService($resource)
    {

        var api = {};

        // Base Url
        api.baseUrl = 'app/data/';

        api.dashboard = {
            project  : $resource(api.baseUrl + 'dashboard/project/data.json')
        };
        
        return api;
    }

})();
