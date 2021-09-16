(function() {
    'use strict';

    angular
        .module('app.pages.private.acompanhamento.incluirAcompanhamentoController', [])
        .controller('IncluirAcompanhamentoController', IncluirAcompanhamentoController);

    /** @ngInject */
    function IncluirAcompanhamentoController($state, $mdToast, $mdDialog, $scope, AcompanhamentoService) {
        IncluirAcompanhamentoController.$inject.forEach((function (dep) {
            this[dep] = eval(dep);
        }).bind(this));

        if (this.$state.params.id_acompanhamento) {
            this.carregarAcompanhamento(this.$state.params.id_acompanhamento);
        }

        this.acompanhamento = {};
        this.acompanhamento.infoPessoal = {};
        this.acompanhamento.refeicao = [];
        this.acompanhamento.medida = [];

        this.acompanhamento.infoPessoal.alimentosPreferidos = [];
        this.acompanhamento.infoPessoal.alimentosNaoAceitos = [];
        this.acompanhamento.infoPessoal.alergiaIntolerancia = [];
    }

    IncluirAcompanhamentoController.prototype.autoCompletePaciente = function(nome) {
        var $this = this;
        this.AcompanhamentoService.autoCompletePaciente(nome).then(function(response){
            $this.pacientes =  response.data;
        }, function(){
            console.log("erro");
        });
        return $this.pacientes;
    };

    IncluirAcompanhamentoController.prototype.salvar = function(acompanhamento, tipoAcompanhamento) {
        var $this = this;
        this.formRefeicao.$setSubmitted();
        if(this.formRefeicao.$valid){
            var endPoint = "salvar";
            var objBack = $this.montarObjBackEnd(acompanhamento, tipoAcompanhamento);
            if (objBack.id) {
                endPoint = "atualizar";
            }
                this.AcompanhamentoService[endPoint](objBack).then(function(response){
                    $this.carregarAcompanhamento(response.data.id_acompanhamento);
                    $this.mostrarToast('Registro salvo.');
                    $this.$state.transitionTo('app.acompanhamento.editar', {'id_acompanhamento': response.data.id_acompanhamento});
                }, function(){
                    $this.mostrarToast('Erro ao salvar registro.');
                });
        }
  	};

    IncluirAcompanhamentoController.prototype.carregarAcompanhamento = function(id) {
        var $this = this;
        this.AcompanhamentoService.carregarAcompanhamento(id).then(function(response){
            $this.acompanhamento = response.data;
        }, function(){
            console.log("Erro ao carregar acompanhamento");
        })
    };
    IncluirAcompanhamentoController.prototype.criarObjChip = function(alimento) {
        return {"descricao":alimento};
    };
    IncluirAcompanhamentoController.prototype.montarObjBackEnd = function(acompanhamento, tipoAcompanhamento) {
        var $this = this;
        var objBackEnd = {};

        if(tipoAcompanhamento === "info_pessoais"){
            objBackEnd = {
                "infoPessoal":{
                    "motivacao":acompanhamento.infoPessoal.motivacao,
                    "expectativa":acompanhamento.infoPessoal.expectativa,
                    "funcao_intestinal":acompanhamento.infoPessoal.funcao_intestinal,
                    "qualidade_sono":acompanhamento.infoPessoal.qualidade_sono,
                    "atv_fisica":acompanhamento.infoPessoal.atv_fisica,
                    "alcool":acompanhamento.infoPessoal.alcool,
                    "fumante":acompanhamento.infoPessoal.fumante,
                    "horaAcorda":acompanhamento.infoPessoal.horaAcorda,
                    "horaDorme":acompanhamento.infoPessoal.horaDorme,
                    "alimentosNaoAceitos":acompanhamento.infoPessoal.alimentosNaoAceitos,
                    "alimentosPreferidos":acompanhamento.infoPessoal.alimentosPreferidos,
                    "alergiaIntolerancia":acompanhamento.infoPessoal.alergiaIntolerancia,
                    "ingestaoAgua":acompanhamento.infoPessoal.ingestaoAgua
                }
            }
        }else if(tipoAcompanhamento === "medidas") {
            objBackEnd.medida = [];
            angular.forEach(acompanhamento.medida, function(medida){
                var item = {
                            "data":medida.data,
                            "peso": $this.formatarNumeroBack(medida.peso,"salvar"),
                            "altura": $this.formatarNumeroBack(medida.altura, "salvar"),
                            "circ_bracoD": $this.formatarNumeroBack(medida.circ_bracoD, "salvar"),
                            "circ_bracoE": $this.formatarNumeroBack(medida.circ_bracoE, "salvar"),
                            "circ_cintura": $this.formatarNumeroBack(medida.circ_cintura, "salvar"),
                            "circ_abdominal": $this.formatarNumeroBack(medida.circ_abdominal, "salvar"),
                            "circ_pernaD": $this.formatarNumeroBack(medida.circ_pernaD, "salvar"),
                            "circ_pernaE": $this.formatarNumeroBack(medida.circ_pernaE, "salvar"),
                            "circ_coxaD": $this.formatarNumeroBack(medida.circ_coxaD, "salvar"),
                            "circ_coxaE": $this.formatarNumeroBack(medida.circ_coxaE, "salvar"),
                            "dc_bicipital": $this.formatarNumeroBack(medida.dc_bicipital, "salvar"),
                            "dc_tricipital": $this.formatarNumeroBack(medida.dc_tricipital, "salvar"),
                            "dc_suprailiaca": $this.formatarNumeroBack(medida.dc_suprailiaca, "salvar"),
                            "dc_supraEscapular": $this.formatarNumeroBack(medida.dc_supraEscapular,"salvar")
                        };
                objBackEnd.medida.push(item);
            });
        }else if(tipoAcompanhamento === "refeicoes"){
            objBackEnd = {
                "refeicao": acompanhamento.refeicao
            }
        }

        objBackEnd.paciente =  acompanhamento.paciente;

        if (acompanhamento.id_acompanhamento) {

            objBackEnd.id_acompanhamento = acompanhamento.id_acompanhamento;

            if (this.acompanhamento.infoPessoal) {
                objBackEnd.infoPessoal = this.acompanhamento.infoPessoal;
            }

            if (this.acompanhamento.medida) {
                objBackEnd.medida = this.acompanhamento.medida;
            }

            if (this.acompanhamento.refeicao) {
                objBackEnd.refeicao = this.acompanhamento.refeicao;
            }
        }

        return objBackEnd;
    };

    IncluirAcompanhamentoController.prototype.adicionarRefeicao = function(ev) {
        var $this = this;

        this.$mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/main/pages/private/acompanhamento/partials/refeicao.modal.html',
            controllerAs: 'ctrl',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        });

        // @ngInject
        function DialogController($scope, $mdDialog) {
            //Select
            $scope.refeicoes = [{"id":"1","descricao":"Almoço"},{"id":"2","descricao":"Café"},{"id":"3","descricao":"Ceia"},{"id":4,"descricao":"Jantar"},{"id":5,"descricao":"Lanche"},{"id":"6","descricao":"Pós-treino"},{"id":"7","descricao":"Pré-treino"}]

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.montarObj = function(refeicao){
                return {
                    "descricao":refeicao.tipoRefeicao.descricao,
                    "horario": refeicao.horario,
                    "alimentos":[]
                };
            };

            $scope.incluir = function(tipoRefeicao){
                var obj = $scope.montarObj(tipoRefeicao);
                $this.acompanhamento.refeicao.push(obj);
                $scope.hide();
            };
        }
    };


    IncluirAcompanhamentoController.prototype.adicionarMedida = function(ev) {
        var $this = this;

        this.$mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/main/pages/private/acompanhamento/partials/medida.modal.html',
            controllerAs: 'ctrl',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        });

        // @ngInject
        function DialogController($scope, $mdDialog) {
            $scope.medida = {};
            $scope.medida.dataMedida = new Date();

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.montarObj = function(medida){
                return {
                    "data": medida.dataMedida
                };
            };

            $scope.incluir = function(tipoMedida){
                var obj = $scope.montarObj(tipoMedida);
                $this.acompanhamento.medida.push(obj);
                $scope.hide();
            };
        }
    };

    IncluirAcompanhamentoController.prototype.mostrarToast = function(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('right')
        );
    };

    IncluirAcompanhamentoController.prototype.calcularIMC = function(acompanhamento) {
        if (acompanhamento.altura && acompanhamento.peso) {
            var altura = acompanhamento.altura;
            var peso = acompanhamento.peso;
            var imc = peso/(altura*altura);
            acompanhamento.imc = String(imc.toFixed(2));
            acompanhamento.imc = acompanhamento.imc.replace(".", ",");
            return acompanhamento;
        }
    };

    IncluirAcompanhamentoController.prototype.formatarNumeroBack = function(medida, key) {
        return medida;
    };

    IncluirAcompanhamentoController.prototype.formatarNumeroFloat = function(acompanhamento, key) {
        var val = acompanhamento[key];

        // remove todos os caracteres não-numéricos
        val = val.replace(/\D/g,'').trim();

        // transforma em array pra facilitar manipulacao
        var valArr = val.split('');

        // adiciona 0 se o número tiver menos de 2 dígitos
        while (valArr.length < 3) {
            valArr.unshift(0 + '');
        }

        // adiciona vírgula antes da penúltima posição
        valArr.splice(valArr.length - 2, 0, '.');

        // retransforma em string
        val = valArr.join('');

        // remove zero a esquerda
        val = val.replace(/^0+/, '');

        // reinsere um zero se a vírgula estiver na 1a posicao
        if (val[0] === '.') {
            val = '0' + val;
        }
        acompanhamento[key] = val;
    };

})();
