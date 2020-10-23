import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { EventModalPage } from '../event-modal/event-modal.page';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.page.html',
  styleUrls: ['./event-page.page.scss'],
})
export class EventPagePage implements OnInit {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  eventTitle: string;
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  ngOnInit() {
  }
  
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }
 
  async addEvent() {
    let modal =  await this.modalCtrl.create({
      component: EventModalPage,
      cssClass: 'cal-modal',
      componentProps: {selectedDay: this.selectedDay, eventTitle: this.eventTitle}});
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if (data.title) {
        console.log(data);
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        console.log(data.title);
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  async onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '' + event.title,
      message: '<p>From: ' + start + '</p><p>To: ' + end + '</p>',
      buttons: ['OK']
    });

    await alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

}
