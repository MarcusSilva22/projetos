(function() {
    'use strict';

    angular
        .module('app.pages.private.paciente.editarPacienteController', [])
        .controller('EditarPacienteController', EditarPacienteController);

    /** @ngInject */
    function EditarPacienteController($state, $mdToast, PacienteService) {
        EditarPacienteController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));
        if (!this.$state.params.paciente) {
            this.$state.transitionTo('app.paciente');
            return null;
        }
        this.isEditar = true;
        this.carregarPaciente();
    }

    EditarPacienteController.prototype.carregarPaciente = function(paciente) {
        this.paciente = this.$state.params.paciente;

        this.paciente.telefone = this.paciente.telefones[0].telefone;
        this.paciente.celular =  this.paciente.telefones[1].telefone;

        this.paciente.dataNascimento = new Date(this.paciente.dataNascimento);

        var cep = this.paciente.cep.toString();
        cep = cep.substr(0,5)+"-"+cep.substr(5,7);

        this.buscarCep(cep);
    }

    EditarPacienteController.prototype.salvar = function(paciente) {
        var $this = this;
        this.formIncluir.$setSubmitted();
        if(this.formIncluir.$valid){
            var objBack = this.montarObj(paciente);
            this.PacienteService.atualizar(paciente.id, objBack).then(function(response){
                $this.mostrarToast('Registro atualizado.');
                $this.$state.go('app.paciente');
            }, function(){
                $this.mostrarToast('Erro ao atualizar registro.');
            });
        }
  	};

    EditarPacienteController.prototype.validarSenha = function(senha, senhaConfirme) {
        if (senhaConfirme.length >=8) {
            if (senha !== senhaConfirme) {
                this.senhaConfirme = "";
                this.mostrarToast('Senhas não conferem.');
            }
        }
    };

    EditarPacienteController.prototype.buscarCep = function(cep) {
        var $this = this;
        this.PacienteService.buscarCep(cep).then(function(response){
            $this.logradouro = response.logradouro;
        }, function(){
            $this.logradouro = null;
            $this.paciente.cep = null;
        });
    };

    EditarPacienteController.prototype.montarObj = function(paciente) {
        var obj = angular.copy(paciente);
        obj.cpf = obj.cpf.replace(/[/.-]/g,"");
        obj.cep = obj.cep.replace(/[/.-]/g,"");
        obj.telefone = obj.telefone.replace(/[/()-]/g,"");
        obj.celular = obj.celular.replace(/[/()-]/g,"");

        var objBackEnd = {
            "id":obj.id,
            "cpf": obj.cpf,
            "email": obj.email,
            "cep": obj.cep,
            "complemento":obj.complemento,
            "numero":obj.numero,
            "telefones":[
                {"id_telefone":this.$state.params.paciente.telefones[0].id_telefone, "telefone":obj.telefone},
                {"id_telefone":this.$state.params.paciente.telefones[1].id_telefone, "telefone":obj.celular}
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

    EditarPacienteController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

})();
