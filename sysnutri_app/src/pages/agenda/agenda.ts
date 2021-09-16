import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
    selector: 'page-agenda',
    templateUrl: 'agenda.html',
})
export class AgendaPage {

    apresentarAgenda :boolean;
    medico: string;
    desabilitaBtn: boolean;
    confirmacao: string;
    horario: Date;
    public agendas: Array<String>;
    private urlAgenda: string = "http://192.168.56.1:8082/api/agenda/8";

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

        this.http.get(this.urlAgenda).map(res => res.json())
            .subscribe(data => {
                this.agendas = data;
                if (this.agendas.length === 0) {
                    this.apresentarAgenda = false;
                }else{
                    this.apresentarAgenda = true;
                }
        });
    }

    desmarcarConsulta() {

        this.http.delete("http://192.168.56.1:8082/api/agendas/8").subscribe((res) => {
            this.apresentarAgenda = false;
        });
    }

    confirmarConsulta() {
  //      this.agendas[0].confirmacao = "S";
        this.http.put('http://192.168.56.1:8082/api/agendas/8', this.agendas[0])
         .subscribe(
               response => {
                console.log("Salvou");
                this.desabilitaBtn = true;
              },
              error => {
                console.log("ERRO");
             });
        }

        getDesabilitaBtn(){
          return this.desabilitaBtn;
        }




}
