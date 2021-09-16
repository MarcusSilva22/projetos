(function ()
{
    'use strict';

    angular
            .module('app.pages.private.acompanhamento.acompanhamentoService', [])
            .service('AcompanhamentoService', AcompanhamentoService);

    /** @ngInject */
    function AcompanhamentoService($http, REST_URL, viaCEP){
        AcompanhamentoService.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));
        this.urlAcompanhamento = REST_URL+'/acompanhamentos';
        this.pesquisa = {};
    }

    AcompanhamentoService.prototype.setPesquisa = function(pesquisa){
        this.pesquisa = pesquisa;
    };

    AcompanhamentoService.prototype.getPesquisa = function(){
        return this.pesquisa;
    };

    AcompanhamentoService.prototype.search = function(params){
        return this.$http.get(this.urlAcompanhamento+"/search",{ params: params });
    };

    AcompanhamentoService.prototype.carregarAcompanhamentos = function(){
        return this.$http.get(this.urlAcompanhamento);
    };

    AcompanhamentoService.prototype.carregarAcompanhamento = function(id){
        return this.$http.get(this.urlAcompanhamento+"/"+id);
    };

    AcompanhamentoService.prototype.autoCompletePaciente = function(nome){
        return this.$http.get('http://localhost:8082/api/pacientes/auto-complete/'+nome);
    };

    AcompanhamentoService.prototype.salvar = function(acompanhamento){
        return this.$http.post(this.urlAcompanhamento, acompanhamento);
    };


    AcompanhamentoService.prototype.atualizar = function(id, json){
    return this.$http.put(this.urlAcompanhamento+"/"+id, json);
    };

    AcompanhamentoService.prototype.excluir = function(id){
        return this.$http.delete(this.urlAcompanhamento+"/"+id);
    };

})();
