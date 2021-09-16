import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
    selector: 'page-dieta',
    templateUrl: 'dieta.html',
})
export class DietaPage {

    public dietas: Array<string>;

    shownGroup = null;
    private urlAcompanhamento: string = "http://192.168.56.1:8082/api/acompanhamento/8";

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
        this.http.get(this.urlAcompanhamento).map(res => res.json())
            .subscribe(data => {
                this.dietas = data.refeicao;
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
