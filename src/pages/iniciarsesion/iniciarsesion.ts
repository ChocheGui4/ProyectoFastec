import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the IniciarsesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iniciarsesion',
  templateUrl: 'iniciarsesion.html',
})
export class IniciarsesionPage {
  data: any = {

  };
  ip = "127.0.0.1";
  //internet="http://chochelatiem.x10host.com/PHP/log.php";
  un
  myForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,  
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public storage: Storage) {
    this.data.user_email = "";
    this.data.user_password = "";
    this.data.option = "";
    this.data.response = "";
    /*this.http = http;*/

    this.myForm = this.fb.group({
      requisitouser: ['', [Validators.required]],
      requisitopass: ['', [Validators.required]],

    });
  }
  Menu() {
    this.navCtrl.push("PrincipalcondPage");

  }
  Recucontra() {
    this.navCtrl.push("RecucontraPage");
  }
  Inicio() {
    this.navCtrl.push("InicioPage");
  }
  Ayuda1() {
    this.navCtrl.push("Ayuda1Page");
  }
  usuario: any
  
  login() {
    let url = "http://" + this.ip + "/PHP/log.php";
    
    //let url = this.internet;
    this.data.option = 'login';
    
    let myData = JSON.stringify({ user_email: this.data.user_email, user_password: this.data.user_password, option: this.data.option });
    
    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];
      

      let r = JSON.parse(this.data.response);
      
      this.usuario = r
      
      console.log(this.usuario);
      if (r.success === true) {
        console.log("verdad");
        //console.log(this.usuario.user.user_data[0].id);//Aquiiiiiiiiiiiiii
        
        
        this.storage.set('id', this.usuario.user.user_data[0].id);
        this.storage.set('nombre', this.usuario.user.user_data[0].nombre);
        this.storage.set('app', this.usuario.user.user_data[0].apellidop);
        this.storage.set('apm', this.usuario.user.user_data[0].apellidom);
        this.storage.set('cell', this.usuario.user.user_data[0].telefono);
        this.storage.set('correo', this.usuario.user.user_data[0].correo);
        //this.storage.set('unidad',this.usuario.user.user_data[0].p);
        //this.storage.set('placas',this.usuario.user.user_data[0].pass);
        this.storage.set('user', this.usuario.user.user_data[0].usuario);
        this.storage.set('pass', this.usuario.user.user_data[0].pass);
        console.log("guardado");
        this.unidad();

      } else {
        console.log("Nada para git: ");
        this.data.user_email = "";
        this.data.user_password = "";
      }

    }, error => {
      console.log("A ver :v");
      console.log(error);

    });
  }
  
  unidad() {
    let url = "http://" + this.ip + "/PHP/log.php";
    //let url = this.internet;
    console.log("pasó a unidad")
    this.data.option = 'traerunidad';
    let myData = JSON.stringify({ idcond: this.usuario.user.user_data[0].id, option: this.data.option });

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];


      let r = JSON.parse(this.data.response);
      this.un = r;
      if (r.success === true) {
        //Aquiiiiiiiiiiiiii



        this.storage.set('unidad', r.user.user_data[0].unidad);
        this.storage.set('placas', r.user.user_data[0].placas);
        this.navCtrl.push("PrincipalcondPage");




      } else {
        this.data.user_email = "";
        this.data.user_password = "";
      }

    }, error => {

      console.log(error);

    });
  }
  Registrarse() {
    this.navCtrl.push("RegistrarPage");
  }
  Omitir(){
    this.navCtrl.push("PrincipalusuarioPage");
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarsesionPage');
  }

}
