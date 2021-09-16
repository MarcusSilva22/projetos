(function() {
    'use strict';

    angular
        .module('app.pages.private.acompanhamento.acompanhamentoController', [])
        .controller('AcompanhamentoController', AcompanhamentoController);

    /** @ngInject */
    function AcompanhamentoController(AcompanhamentoService, $mdDialog, $mdToast, $rootScope) {
        AcompanhamentoController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        if ($rootScope.isSameModulo('app.acompanhamento')) {
            this.pesquisa = this.AcompanhamentoService.getPesquisa();
            if (!_.isEmpty(this.pesquisa)) {
                this.pesquisar(this.pesquisa);
            }
        }

    }

    AcompanhamentoController.prototype.pesquisar = function(pesquisa) {
        var counter = 0;
        for (var key in pesquisa) {
            if (pesquisa[key])
                counter++;
        }
        if(counter !== 0){
            this.AcompanhamentoService.setPesquisa(pesquisa);
            this.carregarAcompanhamentos(pesquisa);
        }else{
            this.mostrarToast("Infome ao menos um parametro.");
        }
    };

    AcompanhamentoController.prototype.carregarAcompanhamentos = function(pesquisa) {
        var $this = this;
        this.AcompanhamentoService.search(pesquisa).then(function(response){
            $this.acompanhamentos = response.data;
        });
  	};

  	AcompanhamentoController.prototype.removerAcompanhamento = function(id, ev) {
        var $this = this;

        var confirm = this.$mdDialog.confirm()
                                  .title('')
                                  .textContent('Excluir registro?')
                                  .ariaLabel('Lucky day')
                                  .targetEvent(ev)
                                  .ok('Sim')
                                  .cancel('não');

        this.$mdDialog.show(confirm).then(function() {
            $this.AcompanhamentoService.excluir(id).then(function(response){
                $this.carregarAcompanhamentos();
                $this.mostrarToast("Registro excluído.");
            },function(){
                $this.mostrarToast("Erro ao excluir registro.");
            });
            return;
        }, function() {
            return;
        });
  	};

    AcompanhamentoController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

    AcompanhamentoController.prototype.limparPesquisa = function() {
        this.acompanhamentos = [];
        this.pesquisa = {};
        this.AcompanhamentoService.setPesquisa({});
    };

})();
