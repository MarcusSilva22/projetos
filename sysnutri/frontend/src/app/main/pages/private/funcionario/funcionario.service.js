(function ()
{
    'use strict';

    angular
            .module('app.pages.private.funcionario.funcionarioService', [])
            .service('FuncionarioService', FuncionarioService);

    /** @ngInject */
    function FuncionarioService($http, viaCEP,REST_URL){
        FuncionarioService.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        this.urlFuncionarios = REST_URL+'/funcionarios';
        this.pesquisa = {};
    }

    FuncionarioService.prototype.setPesquisa = function(pesquisa){
        this.pesquisa = pesquisa;
    };

    FuncionarioService.prototype.getPesquisa = function(){
        return this.pesquisa;
    };

    FuncionarioService.prototype.search = function(params){
        return this.$http.get(this.urlFuncionarios+"/search",{ params: params });
    };

    FuncionarioService.prototype.carregarFuncionarios = function(){
        return this.$http.get(this.urlFuncionarios);
    };


    FuncionarioService.prototype.salvar = function(funcionario){
        return this.$http.post(this.urlFuncionarios, funcionario);
    };

    FuncionarioService.prototype.buscarCep = function(cep){
        return this.viaCEP.get(cep);
    };

    FuncionarioService.prototype.atualizar = function(id, json){
    return this.$http.put(this.urlFuncionarios+"/"+id, json);
    };

    FuncionarioService.prototype.excluir = function(id){
        return this.$http.delete(this.urlFuncionarios+"/"+id);
    };

})();
