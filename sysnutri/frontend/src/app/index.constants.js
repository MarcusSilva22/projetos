(function ()
{
    'use strict';

    angular
        .module('fuse')
        .constant('REST_URL', 'http://localhost:8082/api')
        .constant('ROWS_PAGE', [10,25,50]);
})();
