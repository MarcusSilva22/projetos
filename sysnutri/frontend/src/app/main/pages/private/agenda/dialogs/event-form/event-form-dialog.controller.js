(function ()
{
    'use strict';

    angular.module('app.agenda.eventForm', [])
        .controller('AdicionarAgendaController', AdicionarAgendaController);

    /** @ngInject */
    function AdicionarAgendaController($mdDialog, $mdToast, dialogData, AgendaService)
    {
        var vm = this;

        this.AgendaService = AgendaService;

        // Data
        vm.dialogData = dialogData;

        vm.dataMin = new Date();

        // Methods
        vm.autoCompletePaciente = autoCompletePaciente;
        vm.autoCompleteMedico = autoCompleteMedico;
        vm.saveEvent = saveEvent;
        vm.deleteEvent = deleteEvent;
        vm.closeDialog = closeDialog;

        init();

        /**
         * Initialize
         */
        function init()
        {
            vm.dialogTitle = (vm.dialogData.type === 'add' ? 'Adicionar consulta' : 'Editar consulta');

            // Edit
            if ( vm.dialogData.calendarEvent )
            {
                // Clone the calendarEvent object before doing anything
                // to make sure we are not going to brake the Full Calendar
                vm.calendarEvent = angular.copy(vm.dialogData.calendarEvent);

                // Convert moment.js dates to javascript date object
                if ( moment.isMoment(vm.calendarEvent.start) ){

                    vm.calendarEvent.start = vm.calendarEvent.start.toDate();
                }
            }
            // Add
            else{
                if ( moment.isMoment(vm.dialogData.start) ){
                    var dataSelecionada = vm.dialogData.start.toDate();
                    vm.dialogData.start = new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth(), dataSelecionada.getDate()+1);
                    vm.dialogData.start.setHours(8);
                }

                vm.calendarEvent = {
                   start        : vm.dialogData.start,
                    end          : vm.dialogData.end
                };
            }
        }

        function saveEvent(){
            var response = {
                type         : vm.dialogData.type,
                calendarEvent: vm.calendarEvent
            };
            $mdDialog.hide(response);
        };

        function deleteEvent(){
            var response = {
                type         : "remove",
                calendarEvent: vm.calendarEvent
            };
            removerAgendaBackEnd(response.calendarEvent);
            $mdDialog.hide(response);
        }

        /**
         * Close the dialog
         */
        function closeDialog()
        {
            $mdDialog.cancel();
        }

        function autoCompletePaciente(nome){
            var $this = this;
            this.AgendaService.autoCompletePaciente(nome).then(function(response){
                $this.pacientes =  response.data;
            }, function(){
                console.log("erro");
            });
            return $this.pacientes;
        }

        function autoCompleteMedico(nome){
            var $this = this;
            this.AgendaService.autoCompleteMedico(nome).then(function(response){
                return $this.medicos = response.data.map(function(funcionario){
                    if (funcionario.tipoProfissional === "nutricionista") {
                        return funcionario;
                    }
                });
            }, function(){
                console.log("erro");
            });
            return $this.medicos;
        }

        function removerAgendaBackEnd(obj){
            AgendaService.remover(obj.id).then(function(){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Consulta excluída.")
                        .hideDelay(3000)
                        .position('right')
                );
            },function(){
                console.log("ERRO");
            });
        };


    }
})();
