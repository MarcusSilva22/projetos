(function() {
    'use strict';

    angular
        .module('app.pages.private.acompanhamento.visualizarAcompanhamentoController', [])
        .controller('VisualizarAcompanhamentoController', VisualizarAcompanhamentoController);

    /** @ngInject */
    function VisualizarAcompanhamentoController($state) {
        VisualizarAcompanhamentoController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        if (!this.$state.params.acompanhamento) {
            this.$state.transitionTo('app.acompanhamento');
            return null;
        }

        this.acompanhamento = this.$state.params.acompanhamento;
        this.isVisualizar = true;
    }

})();
