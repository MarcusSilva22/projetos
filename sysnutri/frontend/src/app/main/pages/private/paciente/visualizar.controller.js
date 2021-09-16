(function() {
    'use strict';

    angular
        .module('app.pages.private.paciente.visualizarPacienteController', [])
        .controller('VisualizarPacienteController', VisualizarPacienteController);

    /** @ngInject */
    function VisualizarPacienteController($state, PacienteService) {
        VisualizarPacienteController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        if (!this.$state.params.paciente) {
            this.$state.transitionTo('app.paciente');
            return null;
        }
        this.paciente = this.$state.params.paciente;
        this.paciente.dataNascimento = new Date(this.paciente.dataNascimento);

        this.paciente.telefone = this.paciente.telefones[0].telefone;
        this.paciente.celular =  this.paciente.telefones[1].telefone;

        var cep = this.paciente.cep.toString();
        cep = cep.substr(0,5)+"-"+cep.substr(5,7);

        this.buscarCep(cep);

        this.isVisualizar = true;
    }

    VisualizarPacienteController.prototype.buscarCep = function(cep) {
        var $this = this;
        this.PacienteService.buscarCep(cep).then(function(response){
            $this.logradouro = response.logradouro;
        }, function(){
            $this.logradouro = null;
            $this.funcionario.cep = null;
        });
    };

})();
