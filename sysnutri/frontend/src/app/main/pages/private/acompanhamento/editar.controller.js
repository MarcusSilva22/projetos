(function() {
    'use strict';

    angular
        .module('app.pages.private.acompanhamento.editarAcompanhamentoController', [])
        .controller('EditarAcompanhamentoController', EditarAcompanhamentoController);

    /** @ngInject */
    function EditarAcompanhamentoController($state, $mdToast, AcompanhamentoService) {
        EditarAcompanhamentoController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));
        if (!this.$state.params.acompanhamento) {
            this.$state.transitionTo('app.acompanhamento');
            return null;
        }
        this.acompanhamento = this.$state.params.acompanhamento;
        this.isEditar = true;
    }

    EditarAcompanhamentoController.prototype.salvar = function(acompanhamento) {
        var $this = this;
        this.formIncluir.$setSubmitted();
        if(this.formIncluir.$valid){
            var objBack = this.montarObj(acompanhamento);
            this.AcompanhamentoService.atualizar(acompanhamento.id, objBack).then(function(response){
                $this.mostrarToast('Registro atualizado.');
                $this.$state.go('app.acompanhamento');
            }, function(){
                $this.mostrarToast('Erro ao atualizar registro.');
            });
        }
  	};

    EditarAcompanhamentoController.prototype.montarObj = function(acompanhamento) {
        var objBackEnd = {
        };


        return objBackEnd;
    };

    EditarAcompanhamentoController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

})();
