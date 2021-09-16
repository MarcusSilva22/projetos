(function() {
    'use strict';

    angular
        .module('app.pages.private.notificacao.notificacaoController', [])
        .controller('NotificacaoController', NotificacaoController);

    /** @ngInject */
    function NotificacaoController($mdDialog, NotificacaoService, $mdToast) {
        NotificacaoController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));
    }

    NotificacaoController.prototype.carregarPesquisa = function(param) {
        var $this = this;
        var params = {"nome":param.nome};
        this.NotificacaoService.search(params).then(function(response){
            $this.notificacoes = response.data;
//            $this.notificacoes[0].horario = new Date($this.notificacoes[0].horario);
        });
    };

  	NotificacaoController.prototype.enviarNotificacao = function(notificacao, ev) {
        var $this = this;
        this.$mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/main/pages/private/notificacao/partials/notificacao.modal.html',
          controllerAs: 'ctrl',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        });

        // @ngInject
        function DialogController($scope, $mdDialog) {
           $scope.notificacao = notificacao;

           $scope.hide = function() {
             $mdDialog.hide();
           };

           $scope.cancel = function() {
             $mdDialog.cancel();
           };

           $scope.montarObjBack = function(obj){
               var objBack = {
                  "id": obj.id,
                  "funcionario": {
                    "id": obj.funcionario.id
                  },
                  "paciente": {
                    "id": obj.paciente.id,
                    "telefones": obj.paciente.telefones
                  },
                  "notificacao": {
                    "id": obj.notificacao.id,
                    "mensagem": obj.notificacao.mensagem
                  }
              }
              return objBack;
           }

           $scope.enviar = function(notificao) {
               if ($scope.notificaoForm.$valid) {
                   var objBack = $scope.montarObjBack(notificacao);
                   $this.NotificacaoService.enviarNotificacao(objBack).then(function(){
                      $this.mostrarToast('Notificação enviada com sucesso.');
                      $mdDialog.hide(notificacao);
                   }, function(){
                       $this.mostrarToast('Erro ao enviar notificação.');
                   });
               }
           };
         }
  	};

    NotificacaoController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

    NotificacaoController.prototype.limparPesquisa = function() {
        this.notificacoes = [];
        this.pesquisa = {};
        this.NotificacaoService.setPesquisa({});
    };

})();
