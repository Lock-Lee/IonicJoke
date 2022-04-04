import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppserviceService } from '../appservice.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  gaugeType = 'semi';

  public readTemp;
  public readHum;
  public readLux;
  
  public time_start1;
  public time_start2;
  public time_start3;
  public time_end1;
  public time_end2;
  public time_end3;
  public  Lux_start;
  public  Lux_end;
  public  temp_start;
  public  temp_end;
  constructor(public service: AppserviceService) {
    
    this.service.message((val) => {
      if (val.topic == '/Jokeiot/Jokeiot/getSensor') {
        this.readLux = `${val.message}`.split(',')[0];
        this.readTemp = `${val.message}`.split(',')[1];
        this.readHum = `${val.message}`.split(',')[2];

        
      }
    });
    this.service.message((val) => {
      if (val.topic == '/Jokeiot/Jokeiot/timeall') {
        this.time_start1 = `${val.message}`.split(',')[0];
        this.time_end1 = `${val.message}`.split(',')[1];
        this.time_start2 = `${val.message}`.split(',')[2];
        this.time_end2 = `${val.message}`.split(',')[3];
        this.time_start3 = `${val.message}`.split(',')[4];
        this.time_end3 = `${val.message}`.split(',')[6];

       
      }
    });
      this.service.message((val) => {
      if (val.topic == '/Jokeiot/Jokeiot/setall') {
        this.Lux_start = `${val.message}`.split(',')[0];
        this.Lux_end = `${val.message}`.split(',')[1];
        this.temp_start = `${val.message}`.split(',')[2];
        this.temp_end = `${val.message}`.split(',')[3];
       

       
      }
    });

  }

  ngOnInit() {
    this.service.message((val) => {
      if (val.topic == '/Jokeiot/Jokeiot/Evap') {
        console.log(val);
      }
    });
  }
  public readSensor() {
    this.service.publish(
      `/readsensor`,
      `1`
    );
  }
  public readValue() {
    this.service.publish(
      `/readdata`,
      `1`
    );
  }
}
