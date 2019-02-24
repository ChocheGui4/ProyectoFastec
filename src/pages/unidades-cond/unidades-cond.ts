import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the UnidadesCondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unidades-cond',
  templateUrl: 'unidades-cond.html',
})
export class UnidadesCondPage {
  val1: boolean;
  val2: boolean;
  val3: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    


    console.log(this.val1);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnidadesCondPage');
  }
  Ayuda() {
    this.navCtrl.push("AyudaPage");
  }
  
  menu() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea finalizar el recorrido?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Disagree clicked');
            this.navCtrl.push("PrincipalcondPage");
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Agree clicked');

          }
        }

      ]
    });
    confirm.present();

  }

}
