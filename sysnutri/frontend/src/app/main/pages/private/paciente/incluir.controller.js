(function() {
    'use strict';

    angular
        .module('app.pages.private.paciente.incluirPacienteController', [])
        .controller('IncluirPacienteController', IncluirPacienteController);

    /** @ngInject */
    function IncluirPacienteController($state, $mdToast, PacienteService) {
        IncluirPacienteController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        this.isIncluir = true;
    }

  	IncluirPacienteController.prototype.salvar = function(paciente) {
        var $this = this;
        this.formIncluir.$setSubmitted();
        if(this.formIncluir.$valid){
            var objBack = this.montarObj(paciente);
            this.PacienteService.salvar(objBack).then(function(response){
                $this.mostrarToast('Registro salvo.');
                $this.$state.go('app.paciente');
            }, function(){
                $this.mostrarToast('Erro ao salvar registro.');
            });
        }
  	};

    IncluirPacienteController.prototype.validarSenha = function(senha, senhaConfirme) {
        if (senhaConfirme.length >=8) {
            if (senha !== senhaConfirme) {
                this.senhaConfirme = "";
                this.mostrarToast('Senhas não conferem.');
            }
        }
    };

    IncluirPacienteController.prototype.verificarCpf = function(msg) {
    };

    IncluirPacienteController.prototype.buscarCep = function(cep) {
        var $this = this;
        this.PacienteService.buscarCep(cep).then(function(response){
            $this.logradouro = response.logradouro;
        }, function(){
            $this.logradouro = null;
            $this.paciente.cep = null;
        });
    };

    IncluirPacienteController.prototype.montarObj = function(paciente) {
        var obj = angular.copy(paciente);
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
                {"telefone":obj.celular}
            ],
            "perfil":{
                "id_perfil":"1"
            },
            "usuario": obj.usuario,
            "senha": obj.senha,
            "nome": obj.nome,
            "dataNascimento": obj.dataNascimento
        };


        return objBackEnd;
    };

    IncluirPacienteController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };
})();
