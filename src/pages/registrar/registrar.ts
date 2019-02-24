import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  isActiveToggleTextPassword: Boolean = true;
  Icon: string = "eye";
  myForm: FormGroup;
  data: any = {

  };
  idunidad: any;
  ip = "127.0.0.1";
  //internet="http://chochelatiem.x10host.com/PHP/log.php";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public fb: FormBuilder) {
    this.data.user_name = "";
    this.data.user_app = "";
    this.data.user_apm = "";
    this.data.user_cell = "";
    this.data.user_email = "";
    this.data.user_numuni = "";
    this.data.user_placas = "";
    this.data.user_user = "";
    this.data.user_pass = "";
    this.data.user_cod = "";
    this.data.option = "";
    this.data.response = "";
    this.http = http;

    this.myForm = this.fb.group({
      nameuser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      apepuser: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      apemuser: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      celluser: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^[0-9]\S{0,9}$/)]],
      emailuser: ['', [Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)]],
      numuser: ['', [Validators.required,Validators.pattern(/^[0-9]\S{0,2}$/)]],
      placasuser: ['', [Validators.required, Validators.pattern(/^([A-Z])\S{1,3}-([0-9])\S{1,1}-([0-9])\S{1,1}$/)]],
      useruser: ['', [Validators.required, Validators.pattern(/^((?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16})|((?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,16})$/)]],
      passuser: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^((?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,20})|((?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,20})$/)]],
      passcuser: ['', [Validators.required, Validators.maxLength(20)]],
      codvuser: ['', [Validators.required]],
    }, { validator: this.matchingPasswords('passuser', 'passcuser') });
  }
  //mostrar contraseña
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    if (this.isActiveToggleTextPassword === true) {
      this.Icon = "eye";
    } else {
      this.Icon = "eye-off";
    }
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
  //fin mostrar contraseña

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPage');
  }

  showConfirmg() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea guardar los cambios efectuados?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Disagree clicked');
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

  showConfirmc() {
    this.navCtrl.setRoot("IniciarsesionPage");
  }
  Regresar() {
    this.navCtrl.setRoot("IniciarsesionPage");
  }
 
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  codigo(passwordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];


      if (password.value !== "wuydjWSf") {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
  Usuario() {
    this.UnidadExist();

  }
  CodigoExist() {
    let url = "http://"+this.ip+"/PHP/log.php";
    //let url=this.internet;
    this.data.option = 'codigo';
    let myData = JSON.stringify({ cod: this.data.user_cod, option: this.data.option });

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];


      let r = JSON.parse(this.data.response);

      if (r.success === true) {
        console.log("Codigo existente");
        this.idunidad = r.user.user_data[0].id;
        this.registrarcond();


      } else {
        console.log("Codigo inexistente")
        this.data.user_cod="";
        let alert = this.alertCtrl.create({
          title: 'El código no existe',
          //subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
          buttons: ['Aceptar']
        });
        alert.present();

      }

    }, error => {

      console.log(error);

    });
  }
  UsuarioExist() {
    let url = "http://"+this.ip+"/PHP/log.php";
    //let url=this.internet;
    this.data.option = 'usuario';
    let myData = JSON.stringify({ user: this.data.user_user, option: this.data.option });

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];


      let r = JSON.parse(this.data.response);

      if (r.success === true) {
        console.log("Usuario existente");
        this.data.user_user="";
        let alert = this.alertCtrl.create({
          title: 'Usuario no disponible',
          //subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
          buttons: ['Aceptar']
        });
        alert.present();


      } else {
        console.log("Usuario inexistente")
        this.CodigoExist();


      }

    }, error => {

      console.log(error);

    });
  }
  UnidadExist() {
    let url = "http://"+this.ip+"/PHP/log.php";
    //let url=this.internet;
    this.data.option = 'unidad';
    let myData = JSON.stringify({ unidad: this.data.user_numuni, option: this.data.option });

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];


      let r = JSON.parse(this.data.response);

      if (r.success === true) {
        console.log("Unidad existente");
        this.data.user_numuni="";
        let alert = this.alertCtrl.create({
          title: 'Unidad no disponible',
          //subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
          buttons: ['Aceptar']
        });
        alert.present();


      } else {
        console.log("Unidad inexistente")
        this.PlacasExist();
      }

    }, error => {

      console.log(error);

    });
  }

  PlacasExist() {
    let url = "http://"+this.ip+"/PHP/log.php";
    //let url=this.internet;
    this.data.option = 'placas';
    let myData = JSON.stringify({ placas: this.data.user_placas, option: this.data.option });

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];


      let r = JSON.parse(this.data.response);

      if (r.success === true) {
        console.log("Placas existente");
        this.data.user_placas="";
        let alert = this.alertCtrl.create({
          title: 'Placas no disponibles',
          //subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
          buttons: ['Aceptar']
        });
        alert.present();


      } else {
        console.log("Placas inexistente")
        this.UsuarioExist();
      }

    }, error => {

      console.log(error);

    });
  }
  registrarcond() {
    //console.log("Holaaaaa:   ----> " + this.idunidad);
    let url = "http://"+this.ip+"/PHP/log.php";
    //let url=this.internet;
    this.data.option = 'registercond';
    let myData = JSON.stringify({
      user_name: this.data.user_name,
      user_app: this.data.user_app,
      user_apm: this.data.user_apm,
      user_cell: this.data.user_cell,
      user_email: this.data.user_email,
      user_user: this.data.user_user,
      user_pass: this.data.user_pass,
      //user_numuni: this.data.user_numuni,
      //user_placas: this.data.user_placas,
      user_cod: this.data.user_cod,
      //iduni: this.idunidad,
      option: this.data.option
    });
    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];
      let r = JSON.parse(this.data.response);
      //console.log("Antes de todo");
      if (r.success === true) {
        console.log("Holaaaaa:   ----> conductor registrado " + this.idunidad);
        //this.navCtrl.setRoot("IniciarsesionPage");
        this.registraruni();
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
  registraruni() {
    
    let url = "http://"+this.ip+"/PHP/log.php";
    //let url=this.internet;
    this.data.option = 'registeruni';
    let myData = JSON.stringify({

      user_numuni: this.data.user_numuni,
      user_placas: this.data.user_placas,
      iduni: this.idunidad,
      option: this.data.option
    });
    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];
      let r = JSON.parse(this.data.response);
      //console.log("Antes de todo");
      if (r.success === true) {
        console.log("Adioooos:   ----> unidad registrada " + this.idunidad);
        console.log("por fin se llenaron las 2 tablas:   ----> " + this.idunidad);
        //this.navCtrl.setRoot("IniciarsesionPage");
        
        let confirm = this.alertCtrl.create({
          title: 'Cuenta creada con éxito',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                //Codigo que si


                this.navCtrl.setRoot("IniciarsesionPage");
                //Codigo que si
              }
            }
          ]
        });
        confirm.present();
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
