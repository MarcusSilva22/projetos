(function() {
    'use strict';

    angular
        .module('app.pages.private.funcionario.editarFuncionarioController', [])
        .controller('EditarFuncionarioController', EditarFuncionarioController);

    /** @ngInject */
    function EditarFuncionarioController($state, $mdToast, FuncionarioService) {
        EditarFuncionarioController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        if (!this.$state.params.funcionario) {
            this.$state.transitionTo('app.funcionario');
            return null;
        }

        this.carregarFuncionario();

        this.isEditar = true;
    }

    EditarFuncionarioController.prototype.carregarFuncionario = function() {
        this.funcionario = this.$state.params.funcionario;

        this.funcionario.telefone = this.funcionario.telefones[0].telefone;
        this.funcionario.celular = this.funcionario.telefones[1].telefone;

        this.funcionario.dataNascimento = new Date(this.funcionario.dataNascimento);
        this.funcionario.dataAdmissao = new Date(this.funcionario.dataAdmissao);

        var cep = this.funcionario.cep.toString();
        cep = cep.substr(0,5)+"-"+cep.substr(5,7);

        this.buscarCep(cep);
    };

    EditarFuncionarioController.prototype.salvar = function(funcionario) {
        var $this = this;
        this.formIncluir.$setSubmitted();
        if(this.formIncluir.$valid){
            var objBack = this.montarObj(funcionario);
            this.FuncionarioService.atualizar(funcionario.id, objBack).then(function(response){
                $this.mostrarToast('Registro atualizado.');
                $this.$state.go('app.funcionario');
            }, function(){
                alert("Cancel");
            });
        }
  	};

    EditarFuncionarioController.prototype.validarSenha = function(senha, senhaConfirme) {
        if (senhaConfirme.length >=8) {
            if (senha !== senhaConfirme) {
                this.senhaConfirme = "";
                this.mostrarToast('Senhas não conferem.');
            }
        }
    };

    EditarFuncionarioController.prototype.buscarCep = function(cep) {
        var $this = this;
        this.FuncionarioService.buscarCep(cep).then(function(response){
            $this.logradouro = response.logradouro;
        }, function(){
            $this.logradouro = null;
            $this.funcionario.cep = null;
        });
    };

    EditarFuncionarioController.prototype.montarObj = function(funcionario) {
        var obj = angular.copy(funcionario);
        obj.cpf = obj.cpf.replace(/[/.-]/g,"");
        obj.cep = obj.cep.replace(/[/.-]/g,"");
        angular.forEach(obj.telefones, function(item){
            item.telefone = item.telefone.replace(/[()-]/g,"");
        });

        var objBackEnd = {
            "id":obj.id,
            "cpf": obj.cpf,
            "email": obj.email,
            "cep": obj.cep,
            "complemento":obj.complemento,
            "numero":obj.numero,
            "telefones":[
                {"id_telefone":this.$state.params.funcionario.telefones[0].id_telefone, "telefone":obj.telefone},
                {"id_telefone":this.$state.params.funcionario.telefones[1].id_telefone, "telefone":obj.celular}
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

    EditarFuncionarioController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

})();
