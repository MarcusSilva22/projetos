import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the PerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

    public acompanhamento: Array<string>;
    public agendas: Array<string>;
    private urlAcompanhamento: string = "http://192.168.56.1:8082/api/acompanhamento/8";

    shownGroup = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

        this.http.get(this.urlAcompanhamento).map(res => res.json())
            .subscribe(data => {
                this.acompanhamento = data.medida;
                console.log(this.acompanhamento)
        });

    }

    toggleGroup(group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        } else {
            this.shownGroup = group;
        }
    };

    isGroupShown(group) {
        return this.shownGroup === group;
    };

}
