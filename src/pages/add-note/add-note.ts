import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';
import { MapPage } from '../map/map';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  note: Note = {
    items: '',
    uboi: '',
    cost: undefined,
    loc: '',
    myloc: '',
    lat: 0,
    lng: 0,
    pbit: true,
    ibit: true,
    dboi: '',
    upn: '',
    dpn: ''
  };

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteListService: NoteListService) {
  }

  onInputTime(data,field) : void{
    console.log("Event data: " + data);
    field = data;
    // console.log(typeof this.note.cost);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
    this.note.items = this.navParams.get('items');
    this.note.cost = this.navParams.get('cost');
    this.note.loc = this.navParams.get('loc');
    this.note.lat = this.navParams.get('lat');
    this.note.lng = this.navParams.get('lng');
    this.afAuth.authState.subscribe(data => {
      this.note.uboi = data.email;
      console.log(this.note.uboi);
    })
    this.note.myloc = this.navParams.get('myloc');
    this.note.upn = this.navParams.get('upn');
    // console.log(this.note.lat);
  }

  addNote(note: Note) {
    if((note.items==null)||(note.upn==null)||(note.cost==undefined)||(note.myloc==null)||(note.loc==null)){
      // console.log("ohhhhhh");
      this.toast.create({
        message: 'Fill all details',
        duration: 2000
      }).present();
    }
    else{
      if((note.items=='')||(note.myloc=='')||(note.loc=='')){
        console.log("okay");
        this.toast.create({
          message: 'Fill all details',
          duration: 2000
        }).present();
      }
      else{
        // console.log("wrong => "+note.items);
      console.log(this.note.cost);
      if((note.lat==null) || (note.lng==null)){
        // console.log("here");
        this.toast.create({
          message: 'Mark location in map',
          duration: 2000
        }).present();
      }
      else{
        var number = /^[0-9]{10}$/.test(note.upn)
        if(!number){
          this.toast.create({
            message: 'Invalid',
            duration: 2000
          }).present();
        }
        else{
          this.noteListService.addNote(note).then(ref => {
            this.navCtrl.setRoot('HomePage');
          })
        }
        
      }
      }
      
    }
  }

  loadmap(note: Note){
    // this.navCtrl.push(MapPage,note);
    let data = {
      items : note.items,
      cost : note.cost,
      loc : note.loc,
      lat : note.lat,
      lng : note.lng,
      myloc : note.myloc,
      upn : note.upn
    }
    this.navCtrl.setRoot('MapPage',data);
  }

  goback(){
    this.navCtrl.setRoot('HomePage');
  }

}
