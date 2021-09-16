(function ()
{
    'use strict';
    angular
    .module('app.core.mdDatepickerConfig')
    .directive('mdDatepickerInputContainer', function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.on('click', function() {
                    el.prev().click();
                });
            }
        }
    })
})();
