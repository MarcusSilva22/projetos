(function ()
{
    'use strict';

    angular
            .module('app.pages.private.paciente.pacienteService', [])
            .service('PacienteService', PacienteService);

    /** @ngInject */
    function PacienteService($http, REST_URL, viaCEP){
        PacienteService.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        this.urlPacientes = REST_URL+'/pacientes';
        this.pesquisa = {};
    }

    PacienteService.prototype.setPesquisa = function(pesquisa){
        this.pesquisa = pesquisa;
    };

    PacienteService.prototype.getPesquisa = function(){
        return this.pesquisa;
    };

    PacienteService.prototype.search = function(params){
        return this.$http.get(this.urlPacientes+"/search",{ params: params });
    };

    PacienteService.prototype.carregarPacientes = function(){
        return this.$http.get(this.urlPacientes);
    };

    PacienteService.prototype.salvar = function(paciente){
        return this.$http.post(this.urlPacientes, paciente);
    };

    PacienteService.prototype.buscarCep = function(cep){
        return this.viaCEP.get(cep);
    };

    PacienteService.prototype.atualizar = function(id, json){
    return this.$http.put(this.urlPacientes+"/"+id, json);
    };

    PacienteService.prototype.excluir = function(id){
        return this.$http.delete(this.urlPacientes+"/"+id);
    };

})();
