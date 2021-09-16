(function() {
    'use strict';

    angular
        .module('app.pages.private.funcionario.funcionarioController', [])
        .controller('FuncionarioController', FuncionarioController);

    /** @ngInject */
    function FuncionarioController(ROWS_PAGE, FuncionarioService, $mdDialog, $mdToast, $rootScope) {

        FuncionarioController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        if ($rootScope.isSameModulo('app.funcionario')) {
            this.pesquisa = this.FuncionarioService.getPesquisa();
            if (!_.isEmpty(this.pesquisa)) {
                this.pesquisar(this.pesquisa);
            }
        }
    }

  	FuncionarioController.prototype.pesquisar = function(pesquisa) {
        var counter = 0;
        for (var key in pesquisa) {
            if (pesquisa[key] || key === "ativo")
                counter++;
        }
        if(counter !== 0){
            this.FuncionarioService.setPesquisa(pesquisa);
            this.carregarFuncionarios(pesquisa);
        }else{
            this.mostrarToast("Infome ao menos um parametro.");
        }
    };

  	FuncionarioController.prototype.carregarFuncionarios = function(pesquisa) {
        var $this = this;
        this.FuncionarioService.search(pesquisa).then(function(response){
            $this.funcionarios = response.data;
            if (_.isEmpty($this.funcionarios)) {
                $this.mostrarToast("Nenhum registro encontrado.");
            }
        });
  	};

  	FuncionarioController.prototype.removerFuncionario = function(id, ev) {
        var $this = this;

        var confirm = this.$mdDialog.confirm()
                                  .title('')
                                  .textContent('Excluir registro?')
                                  .ariaLabel('Lucky day')
                                  .targetEvent(ev)
                                  .ok('Sim')
                                  .cancel('não');

        this.$mdDialog.show(confirm).then(function() {
            $this.FuncionarioService.excluir(id).then(function(response){
                $this.carregarFuncionarios();
                $this.mostrarToast("Registro excluído.");
            },function(){
                $this.mostrarToast("Erro ao excluir registro.");
            });
            return;
        }, function() {
            return;
        });
  	};

    FuncionarioController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

    FuncionarioController.prototype.limparPesquisa = function() {
        this.funcionarios = [];
        this.pesquisa = {};
        this.FuncionarioService.setPesquisa({});
    };

})();
