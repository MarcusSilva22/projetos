(function ()
{
    'use strict';

    angular.module('app.agenda.eventDetail',[])
        .controller('VisualizarAgendaController', VisualizarAgendaController);

    /** @ngInject */
    function VisualizarAgendaController($mdDialog, calendarEvent, showEventFormDialog, event)
    {
        var vm = this;

        // Data
        vm.calendarEvent = calendarEvent;

        // Methods
        vm.editEvent = editEvent;
        vm.closeDialog = closeDialog;

        //////////

        function closeDialog()
        {
            $mdDialog.hide();
        }

        function editEvent(calendarEvent)
        {
            showEventFormDialog('edit', calendarEvent, false, false, event);
        }
    }
})();
