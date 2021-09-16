(function() {
    'use strict';

    angular
        .module('app.pages.private.funcionario.visualizarFuncionarioController', [])
        .controller('VisualizarFuncionarioController', VisualizarFuncionarioController);

    /** @ngInject */
    function VisualizarFuncionarioController($state,FuncionarioService) {
        VisualizarFuncionarioController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        if (!this.$state.params.funcionario) {
            this.$state.transitionTo('app.funcionario');
            return null;
        }
        this.funcionario = this.$state.params.funcionario;

        this.funcionario.telefone = this.funcionario.telefones[0].telefone;
        this.funcionario.celular = this.funcionario.telefones[1].telefone;
        this.funcionario.dataNascimento = new Date(this.funcionario.dataNascimento);

        var cep = this.funcionario.cep.toString();
        cep = cep.substr(0,5)+"-"+cep.substr(5,7);

        this.buscarCep(cep);

        this.isVisualizar = true;
    }

    VisualizarFuncionarioController.prototype.buscarCep = function(cep) {
        var $this = this;
        this.FuncionarioService.buscarCep(cep).then(function(response){
            $this.logradouro = response.logradouro;
        }, function(){
            $this.logradouro = null;
            $this.funcionario.cep = null;
        });
    };
})();
