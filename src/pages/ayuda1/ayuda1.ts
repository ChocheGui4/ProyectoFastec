import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Ayuda1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ayuda1',
  templateUrl: 'ayuda1.html',
})
export class Ayuda1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ayuda1Page');
  }

  iniciar() {
    let alert = this.alerCtrl.create({
      title: 'Iniciar sesión',
      message: 'Para poder ingresar como conductor debes introducir tu usuario y contraseña del registro.',
      buttons: ['Aceptar']
    });
    alert.present()
  }
  recu() {
    let alert = this.alerCtrl.create({
      title: 'Recuperar contraseña',
      message: 'Si olvidaste tu contraseña puesdes recuperarla introduciendo tu correo electronico del registro.',
      buttons: ['Aceptar']
    });
    alert.present()
  }
  registro() {
    let alert = this.alerCtrl.create({
      title: 'Registro',
      message: 'Para poder registrarte debes ser conductor de la ruta 17, debes introducir algunos datos.',
      buttons: ['Aceptar']
    });
    alert.present()
  }
  omitir() {
    let alert = this.alerCtrl.create({
      title: 'Omitir',
      message: 'Si no eres conductor, debes omitir el inicio de sesión.',
      buttons: ['Aceptar']
    });
    alert.present()
  }

}
