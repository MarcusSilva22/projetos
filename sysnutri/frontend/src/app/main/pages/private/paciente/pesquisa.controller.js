(function() {
    'use strict';

    angular
        .module('app.pages.private.paciente.pacienteController', [])
        .controller('PacienteController', PacienteController);

    /** @ngInject */
    function PacienteController(PacienteService, $mdDialog, $mdToast, $rootScope) {
        PacienteController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        if ($rootScope.isSameModulo('app.paciente')) {
            this.pesquisa = this.PacienteService.getPesquisa();
            if (!_.isEmpty(this.pesquisa)) {
                this.pesquisar(this.pesquisa);
            }
        }
    }

    PacienteController.prototype.pesquisar = function(pesquisa) {
        var counter = 0;
        for (var key in pesquisa) {
            if (pesquisa[key])
                counter++;
        }
        if(counter !== 0){
            this.PacienteService.setPesquisa(pesquisa);
            this.carregarPacientes(pesquisa);
        }else{
            this.mostrarToast("Infome ao menos um parametro.");
        }
    };

  	PacienteController.prototype.carregarPacientes = function(pesquisa) {
        var $this = this;
        this.PacienteService.search(pesquisa).then(function(response){
            $this.pacientes = response.data;
            if (_.isEmpty($this.pacientes)) {
                $this.mostrarToast("Nenhum registro encontrado.");
            }
        });
  	};

  	PacienteController.prototype.removerPaciente = function(id, ev) {
        var $this = this;

        var confirm = this.$mdDialog.confirm()
                                  .title('')
                                  .textContent('Excluir registro?')
                                  .ariaLabel('Lucky day')
                                  .targetEvent(ev)
                                  .ok('Sim')
                                  .cancel('não');

        this.$mdDialog.show(confirm).then(function() {
            $this.PacienteService.excluir(id).then(function(response){
                $this.carregarPacientes();
                $this.mostrarToast("Registro excluído.");
            },function(){
                $this.mostrarToast("Erro ao excluir registro.");
            });
            return;
        }, function() {
            return;
        });
  	};

    PacienteController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

    PacienteController.prototype.limparPesquisa = function() {
        this.pacientes = [];
        this.pesquisa = {};
        this.PacienteService.setPesquisa({});
    };

})();
