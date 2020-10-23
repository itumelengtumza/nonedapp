import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams,  } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})
export class EventModalPage {
 
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false, title: null };
  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public modalCtrl: ModalController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    let eventTitle = this.navParams.get('eventTitle');
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.event.title = eventTitle;
  }
 
  cancel() {
    let eventTitle = this.navParams.get('eventTitle');
    this.event.title = eventTitle;
    this.modalCtrl.dismiss(this.event);
  }
 
  save() {
    this.modalCtrl.dismiss(this.event);
  }
 
}