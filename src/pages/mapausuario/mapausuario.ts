import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the MapausuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-mapausuario',
  templateUrl: 'mapausuario.html',
})
export class MapausuarioPage {
  map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,
  private loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapausuarioPage');
    this.loadMap();
  }
  async loadMap(){
    const loading = await this.loadCtrl.create();
    loading.present();
    const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
    lat: rta.coords.latitude,
    lng: rta.coords.longitude
    };
    console.log(myLatLng);
    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    const map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
    .addListenerOnce(map, 'idle', () => {
      loading.dismiss();
      const marker = new google.maps.Marker({
        position: {
          lat: myLatLng.lat,
          lng: myLatLng.lng
        },
        zoom: 8,
        map: map,
        title: 'Hello World!'
      });
    });
  }
  Direccion(){
    this.navCtrl.push("DireccionPage");
  }
}
