(function ()
{
    'use strict';

    angular
            .module('app.pages.private.notificacao.notificacaoService', [])
            .service('NotificacaoService', NotificacaoService);

    /** @ngInject */
    function NotificacaoService($http, REST_URL){
        NotificacaoService.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));
        this.REST_URL = REST_URL;
        this.url = REST_URL+"/agendas";
    }

    NotificacaoService.prototype.search = function(params){
        return this.$http.get(this.REST_URL+"/notificacao/search",{ params: params });
    };

    NotificacaoService.prototype.pesquisar = function(){
        return this.$http.get(this.url);
    }

    NotificacaoService.prototype.enviarNotificacao = function(obj){
        return this.$http.post(this.REST_URL+"/enviar-notificacao", obj);
    }

})();
