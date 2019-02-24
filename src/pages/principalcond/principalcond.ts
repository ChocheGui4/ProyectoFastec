import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';



/**
 * Generated class for the PrincipalcondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var testvar,v1,v2,v3,v4
@IonicPage()
@Component({
  selector: 'page-principalcond',
  templateUrl: 'principalcond.html',
})
export class PrincipalcondPage {

  
  
  botondis;
  ob1;ob2;ob3

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public storage: Storage,
    public alertCtrl: AlertController) {
    console.log("Datos");
    console.log(testvar);
    testvar = "Moficicado en typescript";
    console.log(testvar);
    this.ob1=v1;
    this.ob2=v2;
    this.ob3=v3;
    this.botondis=v4;
  }
  copia(){
    let confirm = this.alertCtrl.create({
      title: '¿Desea guardar 1 copia de seguridad de sus datos?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Disagree clicked');
            
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

  onChange(selectedValue) {

    console.info("Selected:", selectedValue);
    if (selectedValue == "Activo") {
      v1=true;
      v2=false;
      v3=false;
      this.botondis=v4=false;
    } else if (selectedValue == "Inactivo") {
      console.log("Inactivo");
      v1=false;
      v2=true;
      v3=false;
      this.botondis=v4=true;

    } else {
      console.log("Ausente");
      v1=false;
      v2=false;
      v3=true;
      this.botondis=v4=true;
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalcondPage');
  }
  Ayuda() {
    this.navCtrl.push("AyudaPage");
  }
  Punto() {
    this.navCtrl.push("PuntoInicialPage", );
  }
  Ver() {
    this.navCtrl.push("PerfilconductorPage");
  }
  Regre() {

    this.navCtrl.setRoot("IniciarsesionPage");
  }



}
