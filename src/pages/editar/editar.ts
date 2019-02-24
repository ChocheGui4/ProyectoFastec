import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {
  isActiveToggleTextPassword: Boolean = true;
  Icon: string = "eye";
  myForm: FormGroup;
  data: any = {

  };
  ip = "127.0.0.1";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public storage: Storage,
    public loadingCtrl: LoadingController) {

    this.storage.get('id').then((val1) => {
      this.data.user_id = val1;
    });


    this.storage.get('nombre').then((val1) => {
      this.data.user_name = val1;
    });

    this.storage.get('app').then((val1) => {
      this.data.user_app = val1;
    });

    this.storage.get('apm').then((val1) => {
      this.data.user_apm = val1;
    });

    this.storage.get('cell').then((val1) => {
      this.data.user_cell = val1;
    });

    this.storage.get('correo').then((val1) => {
      this.data.user_email = val1;
    });

    this.storage.get('unidad').then((val1) => {
      this.data.user_numuni = val1;
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
      useruser: ['', [Validators.required, Validators.pattern(/^((?=\w*\d)(?=\w*[a-zA-Z])(?=\w*[a-z])\S{6,16})|((?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,20})$/)]],
      passuser: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^((?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,20})|((?=\w*\d)(?=\w*[a-zA-Z])(?=\w*[a-z])\S{8,20})$/)]],
    });
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


  Ayuda() {
    this.navCtrl.push("AyudaPage");
  }

  /*Act() {
    this.actualizar();
    this.navCtrl.push("PerfilconductorPage")
  }*/


  showConfirmc() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea anular los cambios efectuados?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            //Codigo que si


            this.navCtrl.pop();
            //Codigo que si
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

  /* actualizar() {
     let url = "http://192.168.0.105:8000/PHP/log.php";
     this.data.option = 'actualizar';
     let myData = JSON.stringify({
       user_id: this.data.user_id,
       user_name: this.data.user_name,
       user_app: this.data.user_app,
       user_apm: this.data.user_apm,
       user_cell: this.data.user_cell,
       user_email: this.data.user_email,
       user_user: this.data.user_user,
       user_pass: this.data.user_pass,
       option: this.data.option
     });
     this.http.post(url, myData).subscribe(data => {
       this.data.response = data['_body'];
       let r = JSON.parse(this.data.response);
       console.log("Antes de todo");
       if (r.success === true) {
 
         this.storage.set('id', this.data.user_id);
         this.storage.set('nombre', this.data.user_name);
 
 
         this.storage.set('app', this.data.user_app);
         this.storage.set('apm', this.data.user_apm);
         this.storage.set('cell', this.data.user_cell);
         this.storage.set('correo', this.data.user_email);
         //this.storage.set('unidad',this.usuario.user.user_data[0].p);
         //this.storage.set('placas',this.usuario.user.user_data[0].pass);
         this.storage.set('user', this.data.user_user);
         this.storage.set('pass', this.data.user_pass);
         //this.storage.set('nombre', this.data.user_name);
         console.log(this.data.user_name);
         let loader = this.loadingCtrl.create({
           content: "Guardando datos...",
           duration: 4000
         });
         loader.present();
 
       }
 
     }, error => {
       console.log("No salió");
       console.log(error);
     });
     console.log("Después de todo, no cuenta");
     this.data.user_name = "";
     this.data.user_app = "";
     this.data.user_apm = "";
     this.data.user_cell = "";
     this.data.user_email = "";
     this.data.user_user = "";
     this.data.user_pass = "";
   }*/

  //Aqui................................----------------------
  Usuario() {
    this.UnidadExist();

  }

  UsuarioExist() {
    let url = "http://"+this.ip+"/PHP/log.php";
    this.data.option = 'usuario';
    console.log("UsuarioExist");
    let myData = JSON.stringify({ user: this.data.user_user, option: this.data.option });

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];


      let r = JSON.parse(this.data.response);

      if (r.success === true) {
        if (this.data.user_id == r.user.user_data[0].id) {
          console.log("Usuario existente pero usable");
          this.registrarcond();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Usuario no disponible',
            //subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['Aceptar']
          });
          alert.present();
        }




      } else {
        console.log("Usuario inexistente")
        this.registrarcond();


      }

    }, error => {

      console.log(error);

    });
  }
  UnidadExist() {
    let url = "http://"+this.ip+"/PHP/log.php";
    this.data.option = 'unidad';
    console.log("unidadExist");
    let myData = JSON.stringify({ unidad: this.data.user_numuni, option: this.data.option });

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];


      let r = JSON.parse(this.data.response);

      if (r.success === true) {

        if (this.data.user_id == r.user.user_data[0].idcond) {
          console.log("Unidad existente pero usable");
          this.PlacasExist();

        } else {
          let alert = this.alertCtrl.create({
            title: 'Unidad no disponible',
            //subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['Aceptar']
          });
          alert.present();
        }


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
    this.data.option = 'placas';
    console.log("PlacasExist");
    let myData = JSON.stringify({ placas: this.data.user_placas, option: this.data.option });

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];


      let r = JSON.parse(this.data.response);

      if (r.success === true) {
        console.log(this.data.user_id);
        console.log(r.user.user_data[0].idcond);
        if (this.data.user_id == r.user.user_data[0].idcond) {
          console.log("Placas existente pero usables");
          this.UsuarioExist();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Placas no disponibles',
            //subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['Aceptar']
          });
          alert.present();
        }




      } else {
        console.log("Placas inexistente")
        this.UsuarioExist();
      }

    }, error => {

      console.log(error);

    });
  }
  registrarcond() {
    
    let url = "http://"+this.ip+"/PHP/log.php";
    this.data.option = 'registercondactulizar';
    console.log("Actualizar todos los datos");
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
      user_id: this.data.user_id,
      //iduni: this.idunidad,
      option: this.data.option
    });
    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];
      let r = JSON.parse(this.data.response);
      //console.log("Antes de todo");
      if (r.success === true) {
        console.log("tabla conductor");
        //this.navCtrl.setRoot("IniciarsesionPage");

        this.storage.set('nombre', this.data.user_name);
        this.storage.set('app', this.data.user_app);
        this.storage.set('apm', this.data.user_apm);
        this.storage.set('cell', this.data.user_cell);
        this.storage.set('correo', this.data.user_email);
        this.storage.set('user', this.data.user_user);
        this.storage.set('pass', this.data.user_pass);
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
    this.data.option = 'registeruniact';
    console.log("RegisterUnidad");
    let myData = JSON.stringify({

      user_numuni: this.data.user_numuni,
      user_placas: this.data.user_placas,
      iduni: this.data.user_id,
      option: this.data.option
    });
    this.http.post(url, myData).subscribe(data => {
      this.data.response = data['_body'];
      let r = JSON.parse(this.data.response);
      //console.log("Antes de todo");
      if (r.success === true) {
        console.log("RegisterUnidad success");
        
        
        //console.log("por fin se llenaron las 2 tablas:   ----> " + this.data.user_id);
        //this.navCtrl.setRoot("IniciarsesionPage");
        
        
        
        let loader = this.loadingCtrl.create({
          content: "Guardando datos...",
          duration: 2000
        });
        
        loader.present();
        if(this.storage.set('placas', this.data.user_placas) && this.storage.set('unidad', this.data.user_numuni) ){
          this.navCtrl.push("PrincipalcondPage")
        }
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
