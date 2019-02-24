import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-perfilconductor',
  templateUrl: 'perfilconductor.html',
})
export class PerfilconductorPage {
  typ: String;
  ToggleTextPassword: Boolean = true;
  myIcon: string = "eye";
  data: any = {

  };
  ip = "127.0.0.1";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public storage: Storage) {
    //Aquiiiiiii

    this.storage.get('id').then((val1) => {
      this.data.user_id = val1;
    });
    this.storage.get('nombre').then((val1) => {
      this.data.user_name = val1 + " ";
    });

    this.storage.get('app').then((val1) => {
      this.data.user_name += val1 + " ";
    });

    this.storage.get('apm').then((val1) => {
      this.data.user_name += val1;
    });


    this.storage.get('cell').then((val1) => {
      this.data.user_cell = val1;
    });

    this.storage.get('correo').then((val1) => {
      this.data.user_email = val1;
    });
    this.storage.get('unidad').then((val1) => {
      this.data.user_num = val1;
    });
    this.storage.get('placas').then((val1) => {
      this.data.user_placas = val1;
    });


    this.storage.get('user').then((val1) => {
      this.data.user_user = val1;
    });
    this.storage.get('pass').then((val1) => {
      this.data.user_pass = val1;
    });
  }
  //mostrar contraseña

  public toggleTextPassword(): void {
    this.ToggleTextPassword = (this.ToggleTextPassword == true) ? false : true;
  }
  public getType() {
    if (this.ToggleTextPassword === true) {
      this.myIcon = "eye";
    } else {
      this.myIcon = "eye-off";
    }
    return this.ToggleTextPassword ? 'password' : 'text';

  }
  //fin mostrar contraseña

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilconductorPage');
  }
  
  Ayuda() {
    this.navCtrl.push("AyudaPage");
  }
  Regresar() {
    this.navCtrl.push("PrincipalcondPage");
  }

  IraEditar() {
    this.navCtrl.push("EditarPage");
  }
  Eliminar() {
    let confirm = this.alertCtrl.create({
      title: '¿Estás seguro de eliminar tu cuenta?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Disagree clicked');
            this.Eliminaruni();
            this.navCtrl.setRoot("IniciarsesionPage");
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
  //Eliminar unidad
  Eliminaruni() {

    let url = "http://" + this.ip + "/PHP/log.php";
    this.data.option = 'eliminaruni';
    console.log("Entró al método eliminar unidad");
    console.log(this.data.user_id);
    let myData = JSON.stringify({
      iduni: this.data.user_id,
      option: this.data.option
    });
    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];
      let r = JSON.parse(this.data.response);
      //console.log("Antes de todo");
      if (r.success === true) {
        console.log("Unidad eliminada");
        this.Eliminarcond();


        //console.log("por fin se llenaron las 2 tablas:   ----> " + this.data.user_id);
        //this.navCtrl.setRoot("IniciarsesionPage");



        /*let loader = this.loadingCtrl.create({
          content: "Guardando datos...",
          duration: 2000
        });

        loader.present();*/

      }

    }, error => {
      console.log("No salió");
      console.log(error);
    });
    
    /*this.data.user_name = "";
    this.data.user_app = "";
    this.data.user_apm = "";
    this.data.user_cell = "";
    this.data.user_email = "";
    this.data.user_user = "";
    this.data.user_pass = "";*/
  }
  Eliminarcond() {

    let url = "http://" + this.ip + "/PHP/log.php";
    this.data.option = 'Eliminarcond';
    console.log("Entró al método eliminar conductor");
    console.log(this.data.user_id);
    let myData = JSON.stringify({
      user_id: this.data.user_id,
      //iduni: this.idunidad,
      option: this.data.option
    });
    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];
      let r = JSON.parse(this.data.response);
      //console.log("Antes de todo");
      if (r.success === true) {
        console.log("Conductor eliminado");
        this.navCtrl.setRoot("IniciarsesionPage");

        this.storage.remove('id');
        this.storage.remove('nombre');
        this.storage.remove('app');
        this.storage.remove('apm');
        this.storage.remove('cell');
        this.storage.remove('correo');
        this.storage.remove('user');
        this.storage.remove('pass');
        this.storage.remove('unidad');
        this.storage.remove('placas');

      }

    }, error => {
      console.log("No salió");
      console.log(error);
    });
    console.log("Después de todo, no cuenta");
    /*this.data.user_name = "";
    this.data.user_app = "";
    this.data.user_apm = "";
    this.data.user_cell = "";
    this.data.user_email = "";
    this.data.user_user = "";
    this.data.user_pass = "";*/
  }


}
