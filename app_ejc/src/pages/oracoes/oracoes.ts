import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
* Generated class for the OracoesPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-oracoes',
    templateUrl: 'oracoes.html',
})

export class OracoesPage {

    public oracoes: Array<Object>;

    shownGroup = null;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.oracoes = [{
            id:1,
            nome:"Oração da serenidade",
            descricao: "Senhor, concedei-me a serenidade para aceitar as coisas que não posso modificar. Coragem para modificar aquelas que posso e sabedoria para perceber a diferença.Amém."
        },{
            id:2,
            nome:"Ave Maria",
            descricao: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém"
        },{
            id:3,
            nome:"Pai Nosso",
            descricao: "Pai Nosso que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém"
        },{
            id:4,
            nome:"Salve Rainha",
            descricao: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro nos mostrai Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, santa Mãe de Deus. R: Para que sejamos dignos das promessas de Cristo."
        },{
            id:5,
            nome:"Santo Anjo",
            descricao: "Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarda, me governa me ilumina. Amém"
        }];
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


    ionViewDidLoad() {
    console.log('ionViewDidLoad OracoesPage');
    }

}
