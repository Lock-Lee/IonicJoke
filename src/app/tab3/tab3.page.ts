import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public Evap: boolean = false;
  public openlight: boolean = false;
  
  public dooron: boolean = false;
  public dooroff: boolean = false;
  public status1: boolean = false;
  public door_status: any = false;
  public light_status: any = false;
  public evap_status: any = false;
  public water_status: any = false;
  public water: any = false;
  public  status_mode :any =1;
  public status_door;
  public status_evap;
  public status_light;
  public status_water;
  public status_con ="";
  constructor(
    public fb: AngularFireDatabase,
    public service: AppserviceService
  ) {
    this.status_con  =  this.service.present();

    this.service.message((val) => {
      console.log(val);
      
      if (val.topic == '/Jokeiot/Jokeiot/status') {
        this.door_status = `${val.message}`.split(',')[0];
        this.evap_status = `${val.message}`.split(',')[1];
        this.light_status = `${val.message}`.split(',')[2];
        this.status_water = `${val.message}`.split(',')[3];
      }
    });
   
    
    this.status_con  =  service.present();
    console.log(service.present());
    
    console.log(this.status_con);
    
  }
  ngOnInit() {
    this.status_con  =  this.service.present();
    this.status_mode = 0
   
     
  }
  public onClickMode = (e) => {
    console.log(e);
    
   this.status_mode = e.detail.value;
  
    console.log(this.status_mode);
    
  
      this.service.publish(`/mode`, `${this.status_mode}`);
  };
  public onClickEvap = (e) => {
    this.status_evap = e.detail.checked;
    let x;
    if (e.detail.checked) {
      x = 1;
    } else {
      x = 0;
    }
    console.log(x);

   
      this.service.publish(`/Evap`, `${x}`);
  };
  public onClickWater = (e) => {
    this.status_evap = e.detail.checked;
    let x;
    if (e.detail.checked) {
      x = 1;
    } else {
      x = 0;
    }
    console.log(x);

   
      this.service.publish(`/pumpwater`, `${x}`);
  };
  public onClicklight = (e) => {
    this.status_light = e.detail.checked;

    let x;
    if (e.detail.checked) {
      x = 1;
    } else {
      x = 0;
    }
  
  
      this.service.publish(`/light`, `${x}`);
  };
  public onClickonDoor = (e) => {
    console.log(e.detail.checked);
    if (e.detail.checked === true) {
      this.status1 = true;
      this.dooroff = false;

      this.status_door = 'on';
      this.service.publish(`/Door`, `on`);
     
    }
  };
  public onClickoffDoor = (e) => {
    console.log(e.detail.checked);
    if (e.detail.checked === true) {
      this.status1 = false;
      this.dooron = false;
      this.status_door = 'off';
     
        this.service.publish(`/Door`, `off`);
    }
  };
  public readstatus() {
    this.service.message((val) => {
     
      
      if (val.topic == '/Jokeiot/Jokeiot/status') {
        this.door_status = `${val.message}`.split(',')[0];
        this.evap_status = `${val.message}`.split(',')[1];
        this.light_status = `${val.message}`.split(',')[2];
        this.status_water = `${val.message}`.split(',')[3];
      }
    });
    this.service.publish(`/readstatus`, `1`);
    
    this.status_con  =  this.service.present();
  }
}
