(function ()
{
    'use strict';

    angular
        .module('app.agenda')
        .controller('AgendaController', AgendaController);

    /** @ngInject */
    function AgendaController($timeout, uiCalendarConfig, $mdToast, $mdDialog, $document, AgendaService)
    {
        var vm = this;

        // Data
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        vm.events = [[]];


        // Methods
        vm.addEvent = addEvent;
        vm.salvarBackEnd = salvarBackEnd;
        vm.montarObjBack = montarObjBack;
        vm.next = next;
        vm.prev = prev;

        buscarAgenda();

        function montarObjBack(obj){

            var dia = obj.start.getDate()+"/"+obj.start.getMonth()+"/"+obj.start.getFullYear();
            var horario = obj.start.getHours()+":"+obj.start.getMinutes();

            var objBackEnd = {
                "horario": obj.start,
                "paciente":obj.paciente,
                "funcionario":obj.medico,
                "notificacao": {
                    "mensagem": "Confirme sua consulta no dia "+dia+ " às "+horario
                },
                "confirmacao":"Consulta não confirmada"
            }
            if (obj.id) {
                objBackEnd.id = obj.id;
            }
            return objBackEnd;
        }

        function atualizarBackEnd(obj){
            var objBackEnd = montarObjBack(obj);
            AgendaService.atualizar(objBackEnd, objBackEnd.id).then(function(response){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Consulta remarcada.")
                        .hideDelay(3000)
                        .position('right')
                );
            },function(){
                console.log("ERRO");
            });
        }

        function salvarBackEnd(obj){
            var objBackEnd = montarObjBack(obj);

            AgendaService.salvar(objBackEnd).then(function(response){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Consulta marcada.")
                        .hideDelay(3000)
                        .position('right')
                );

                var eventLength = vm.events[0].length;
                var obj = {
                    id   : response.data.id,
                    start: new Date(response.data.horario),
                    title: response.data.paciente.nome,
                    paciente: response.data.paciente,
                    medico: response.data.funcionario
                }

                vm.events[0][eventLength-1] = obj;
            },function(){
                console.log("ERRO");
            });
        }


        function buscarAgenda(){
            vm.events = [[]];
            AgendaService.buscarAgenda().then(function(response){
                response.data.forEach(function(agenda){
                    vm.events[0].push({
                        id   : agenda.id,
                        start: new Date(agenda.horario),
                        title: agenda.paciente.nome,
                        paciente: agenda.paciente,
                        medico: agenda.funcionario
                    });
                });

                vm.calendarUiConfig = {
                    calendar: {
                        editable     : true,
                        eventLimit   : true,
                        header       : '',
                        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        dayNames     : ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                        dayNamesShort: ['Dom', 'Seg', 'Terça', 'Qua', 'Qui', 'Sex', 'Sáb'],
                        viewRender   : function (view)
                        {
                            vm.calendarView = view;
                            vm.calendar = vm.calendarView.calendar;
                            vm.currentMonthShort = vm.calendar.getDate().format('MMM');
                        },
                        columnFormat : {
                            month: 'ddd',
                            week : 'ddd M',
                            day  : 'ddd M'
                        },
                        eventClick   : eventDetail,
                        selectable   : true,
                        selectHelper : true,
                        select       : select,
                        timeFormat: 'H:mm'
                    }
                };


            },function(){
                console.log("Erro ao carregar agenda");
            });
        }

        /**
         * Go to next on current view (week, month etc.)
         */
        function next()
        {
            vm.calendarView.calendar.next();
            buscarAgenda();
        }

        /**
         * Go to previous on current view (week, month etc.)
         */
        function prev()
        {
            vm.calendarView.calendar.prev();
            buscarAgenda();
        }

        /**
         * Show event detail
         *
         * @param calendarEvent
         * @param e
         */
        function eventDetail(calendarEvent, e)
        {
            showEventDetailDialog(calendarEvent, e);
        }

        /**
         * Add new event in between selected dates
         *
         * @param start
         * @param end
         * @param e
         */
        function select(start, end, e)
        {
            showEventFormDialog('add', false, start, end, e);
        }

        /**
         * Add event
         *
         * @param e
         */
        function addEvent(e)
        {
            var start = new Date(),
                end = new Date();

            showEventFormDialog('add', false, start, end, e);
        }

        /**
         * Show event detail dialog
         * @param calendarEvent
         * @param e
         */
        function showEventDetailDialog(calendarEvent, e)
        {
            $mdDialog.show({
                controller         : 'VisualizarAgendaController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/pages/private/agenda/dialogs/event-detail/event-detail-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : e,
                clickOutsideToClose: true,
                locals             : {
                    calendarEvent      : calendarEvent,
                    showEventFormDialog: showEventFormDialog,
                    event              : e
                }
            });
        }

        /**
         * Show event add/edit form dialog
         *
         * @param type
         * @param calendarEvent
         * @param start
         * @param end
         * @param e
         */
        function showEventFormDialog(type, calendarEvent, start, end, e)
        {
            var dialogData = {
                type         : type,
                calendarEvent: calendarEvent,
                start        : start,
                end          : end
            };

            $mdDialog.show({
                controller         : 'AdicionarAgendaController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/pages/private/agenda/dialogs/event-form/event-form-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : e,
                clickOutsideToClose: true,
                locals             : {
                    dialogData: dialogData
                }
            }).then(function (response){
                if ( response.type === 'add' ){
                    if (vm.events[0].length === 0) {
                        vm.events[0].push({
                            start: response.calendarEvent.start,
                            paciente: response.calendarEvent.paciente,
                            medico: response.calendarEvent.medico
                        });
                        salvarBackEnd(response.calendarEvent);
                        return;
                    }else {
                        var horarioCadastrado = vm.events[0].some(function(item){

                            var medicoInformado = item.medico.id;
                            var medicoInCadastrado = response.calendarEvent.medico.id;

                            var dataInformada = item.start.getDate()+"-"+item.start.getMonth()+"-"+item.start.getFullYear()
                            var dataCadatrada = response.calendarEvent.start.getDate()+"-"+response.calendarEvent.start.getMonth()+"-"+response.calendarEvent.start.getFullYear()

                            var horaInformada = item.start.getHours()+":"+item.start.getMinutes();
                            var horaCadastrada = response.calendarEvent.start.getHours()+":"+response.calendarEvent.start.getMinutes();

                            if(dataInformada === dataCadatrada && horaInformada === horaCadastrada && medicoInformado === medicoInCadastrado){
                                return true;
                            }
                            return false;
                        });

                        if (!horarioCadastrado) {
                            vm.events[0].push({
                                start: response.calendarEvent.start,
                                paciente: response.calendarEvent.paciente,
                                medico: response.calendarEvent.medico
                            });
                            salvarBackEnd(response.calendarEvent);
                        }else{
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent("O horário informado tem outro paciente.")
                                    .hideDelay(3000)
                                    .position('right')
                            );
                        }
                    }
                }else{
                    if ( response.type === 'edit' ){
                        for ( var i = 0; i < vm.events[0].length; i++ ){
                            if ( vm.events[0][i].id === response.calendarEvent.id ){
                                var horarioCadastrado = vm.events[0].some(function(item){

                                    var medicoInformado = item.medico.id;
                                    var medicoInCadastrado = response.calendarEvent.medico.id;

                                    var dataInformada = item.start.getDate()+"-"+item.start.getMonth()+"-"+item.start.getFullYear()
                                    var dataCadatrada = response.calendarEvent.start.getDate()+"-"+response.calendarEvent.start.getMonth()+"-"+response.calendarEvent.start.getFullYear()

                                    var horaInformada = item.start.getHours()+":"+item.start.getMinutes();
                                    var horaCadastrada = response.calendarEvent.start.getHours()+":"+response.calendarEvent.start.getMinutes();

                                    if(dataInformada === dataCadatrada && horaInformada === horaCadastrada && medicoInformado === medicoInCadastrado){
                                        return true;
                                    }
                                    return false;
                                });

                                if (!horarioCadastrado) {
                                    vm.events[0][i] = {
                                        id: response.calendarEvent.id,
                                        start: response.calendarEvent.start,
                                        paciente: response.calendarEvent.paciente,
                                        medico: response.calendarEvent.medico
                                    };
                                    atualizarBackEnd(response.calendarEvent);
                                    break;
                                }else{
                                    $mdToast.show(
                                        $mdToast.simple()
                                            .textContent("O horário informado tem outro paciente.")
                                            .hideDelay(3000)
                                            .position('right')
                                    );
                                }
                            }
                        }
                    }else if ( response.type === 'remove' ){
                        for ( var i = 0; i < vm.events[0].length; i++ ){
                            var index = null;
                            if ( vm.events[0][i].id === response.calendarEvent.id ){
                                index = i;
                                break;
                            }
                        }
                        vm.events[0].splice(index, 1);
                    }
                }
            });
        }

    }

})();
