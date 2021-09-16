(function() {
    'use strict';

    angular
        .module('app.pages.private.funcionario.incluirFuncionarioController', [])
        .controller('IncluirFuncionarioController', IncluirFuncionarioController);

    /** @ngInject */
    function IncluirFuncionarioController($state, $mdToast, FuncionarioService) {
        IncluirFuncionarioController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));
        this.isIncluir = true;
    }

    IncluirFuncionarioController.prototype.salvar = function(funcionario) {
        var $this = this;
        this.formIncluir.$setSubmitted();
        if(this.formIncluir.$valid){
            var objBack = this.montarObj(funcionario);
            this.FuncionarioService.salvar(objBack).then(function(response){
                $this.mostrarToast('Registro salvo.');
                $this.$state.go('app.funcionario');
            }, function(){
                $this.mostrarToast('Erro ao salvar registro.');
            });
        }
  	};

    IncluirFuncionarioController.prototype.validarSenha = function(senha, senhaConfirme) {
        if (senhaConfirme.length >=8) {
            if (senha !== senhaConfirme) {
                this.senhaConfirme = "";
                this.mostrarToast('Senhas não conferem.');
            }
        }
    };

    IncluirFuncionarioController.prototype.verificarCpf = function(msg) {
    };

    IncluirFuncionarioController.prototype.buscarCep = function(cep) {
        var $this = this;
        this.FuncionarioService.buscarCep(cep).then(function(response){
            $this.logradouro = response.logradouro;
        }, function(){
            $this.logradouro = null;
            $this.funcionario.cep = null;
        });
    };

    IncluirFuncionarioController.prototype.montarObj = function(funcionario) {
        var obj = angular.copy(funcionario);
        obj.cpf = obj.cpf.replace(/[/.-]/g,"");
        obj.cep = obj.cep.replace(/[/.-]/g,"");
        angular.forEach(obj.telefones, function(item){
            item.telefone = item.telefone.replace(/[()-]/g,"");
        });

        var objBackEnd = {
            "cpf": obj.cpf,
            "email": obj.email,
            "cep": obj.cep,
            "complemento":obj.complemento,
            "numero":obj.numero,
            "telefones":[
                {"telefone":obj.telefone},
                {"telefone":obj.celular},
            ],
            "perfil":{
                "id_perfil":"2"
            },
            "usuario": obj.usuario,
            "senha": obj.senha,
            "nome": obj.nome,
            "dataNascimento": obj.dataNascimento,
            "dataAdmissao": obj.dataAdmissao,
            "tipoProfissional":obj.tipoProfissional
        };

        return objBackEnd;
    };

    IncluirFuncionarioController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

})();
