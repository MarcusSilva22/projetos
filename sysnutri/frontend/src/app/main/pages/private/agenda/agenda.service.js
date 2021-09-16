(function ()
{
    'use strict';

    angular
            .module('app.pages.private.agenda.agendaService', [])
            .service('AgendaService', AgendaService);

    /** @ngInject */
    function AgendaService($http, REST_URL){
        AgendaService.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));
    }

    AgendaService.prototype.autoCompleteMedico = function(nome){
        return this.$http.get(this.REST_URL+'/funcionarios/auto-complete/'+nome);
    };

    AgendaService.prototype.autoCompletePaciente = function(nome){
        return this.$http.get(this.REST_URL+'/pacientes/auto-complete/'+nome);
    };

    AgendaService.prototype.buscarAgenda = function(){
        return this.$http.get(this.REST_URL+'/agendas');
    };

    AgendaService.prototype.salvar = function(objBack){
        return this.$http.post(this.REST_URL+'/agendas',objBack);
    };

    AgendaService.prototype.atualizar = function(objBack,id){
        return this.$http.put(this.REST_URL+'/agendas/'+id, objBack);
    };


    AgendaService.prototype.remover = function(id){
        return this.$http.delete(this.REST_URL+'/agendas/'+id);
    };


})();
