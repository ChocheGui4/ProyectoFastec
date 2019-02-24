import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PuntoInicialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punto-inicial',
  templateUrl: 'punto-inicial.html',
})
export class PuntoInicialPage {
  v1:boolean;
  v2:boolean;
  v3:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.v1=navParams.get('var1');
    this.v2=navParams.get('var2');
    this.v3=navParams.get('var3');
    console.log(this.v1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PuntoInicialPage');
  }
  Ayuda() {
    this.navCtrl.push("AyudaPage");
  }
  Rutas(){
    this.navCtrl.push("UnidadesCondPage",{ov1:this.v1,
      ov2:this.v2,
      ov3:this.v3
  });
  }
  Regre(){
    this.navCtrl.push("PrincipalcondPage");
  }
}
