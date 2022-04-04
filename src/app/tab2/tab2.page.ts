import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Swal from 'sweetalert2';
import { AppserviceService } from '../appservice.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public setTimeStart1: string = '--:--';
  public setTimeEnd1: string = '--:--';
  public setTimeStart2: string = '--:--';
  public setTimeEnd2: string = '--:--';
  public setTimeStart3: string = '--:--';
  public setTimeEnd3: string = '--:--';
  public setTemp1: string = '';
  public setTemp2: string = '';
  public setLux1: string = '';
  public setLux2: string = '';
  constructor(
    public fb: AngularFireDatabase,
    public service: AppserviceService
  ) {}
  ngOnInit() {
    this.fb
      .object('set/time1')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.setTimeStart1 = value.split(',')[0];
        this.setTimeEnd1 = value.split(',')[1];
      });
    this.fb
      .object('set/time2')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.setTimeStart2 = value.split(',')[0];
        this.setTimeEnd2 = value.split(',')[1];
      });
      this.fb
      .object('set/time3')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.setTimeStart3 = value.split(',')[0];
        this.setTimeEnd3 = value.split(',')[1];
      });
    this.fb
      .object('set/setLux')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.setLux1 = value.split(',')[0];
        this.setLux2 = value.split(',')[1];
      });
    this.fb
      .object('set/setTemp')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.setTemp1 = value.split(',')[0];
        this.setTemp2 = value.split(',')[1];
      });
  }

  public getTime1(part: any, data) {
    let dt_s = new Date(data);
    if (part === 'start') {
      let timestart = `${this.zeroPad(dt_s.getHours())}:${this.zeroPad(
        dt_s.getMinutes()
      )}`;
      this.setTimeStart1 = timestart;
    } else if (part === 'end') {
      let timestart = `${this.zeroPad(dt_s.getHours())}:${this.zeroPad(
        dt_s.getMinutes()
      )}`;
      this.setTimeEnd1 = timestart;
    }
    if (this.setTimeStart1 !== undefined && this.setTimeEnd1 !== undefined) {
      this.fb
        .object('set/time1')
        .set(this.setTimeStart1 + ',' + this.setTimeEnd1)
        .then(() => {
          this.service.publish(
            `/time1`,
            `${this.setTimeStart1},${this.setTimeEnd1}`
          );
        });
    }
  }
  public getTime2(part: any, data) {
    let dt_s = new Date(data);
    if (part === 'start') {
      let timestart = `${this.zeroPad(dt_s.getHours())}:${this.zeroPad(
        dt_s.getMinutes()
      )}`;
      this.setTimeStart2 = timestart;
    } else if (part === 'end') {
      let timestart = `${this.zeroPad(dt_s.getHours())}:${this.zeroPad(
        dt_s.getMinutes()
      )}`;
      this.setTimeEnd2 = timestart;
    }
    if (this.setTimeStart2 !== undefined && this.setTimeEnd2 !== undefined) {
      this.fb
        .object('set/time2')
        .set(this.setTimeStart2 + ',' + this.setTimeEnd2)
        .then(() => {
          this.service.publish(
            `/time2`,
            `${this.setTimeStart2},${this.setTimeEnd2}`
          );
        });
    }
  }
  public getTime3(part: any, data) {
    let dt_s = new Date(data);
    if (part === 'start') {
      let timestart = `${this.zeroPad(dt_s.getHours())}:${this.zeroPad(
        dt_s.getMinutes()
      )}`;
      this.setTimeStart3 = timestart;
    } else if (part === 'end') {
      let timestart = `${this.zeroPad(dt_s.getHours())}:${this.zeroPad(
        dt_s.getMinutes()
      )}`;
      this.setTimeEnd3 = timestart;
    }
    if (this.setTimeStart3 !== undefined && this.setTimeEnd3 !== undefined) {
      this.fb
        .object('set/time3')
        .set(this.setTimeStart3 + ',' + this.setTimeEnd3)
        .then(() => {
          this.service.publish(
            `/time3`,
            `${this.setTimeStart3},${this.setTimeEnd3}`
          );
        });
    }
  }
  private zeroPad(nr, base = 10) {
    return nr;
    var len = String(base).length - String(nr).length + 1;
  }
  public SetLux(val: any, val2: any) {
    this.setLux1 = val;
    this.setLux2 = val2;

    if (val <= 70000) {
      Swal.fire({
        title: 'ต้องการยืนยัน?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ตกลง!',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'สำเร็จ',
            text:
              'ความเข้มแสงที่เหมาะสม ' + this.setLux1 + ' ถึง ' + this.setLux2,
            icon: 'success',
            confirmButtonText: 'ตกลง',
            timer: 1500,
          });
          this.fb
            .object('set/setLux')
            .set(this.setLux1 + ',' + this.setLux2)
            .then(() => {
              this.service.publish(
                `/setLux`,
                `${this.setLux1},${this.setLux2}`
              );
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'ทำการยกเลิก',
            icon: 'error',
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        title: 'ค่าความเข้มแสงสุงเกินไป!',
        text: 'โปรดใส่ไม่เกิน 70000 Lux',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
        timer: 1500,
      });
    }
  }

  public SetTemp(val: any, val1: any) {
    let str = 0;
    this.setTemp1 = val;
    this.setTemp2 = val1;
    if (val <= 40 && val1 <= 40) {
      Swal.fire({
        title: 'ต้องการยืนยัน?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ตกลง!',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'อุณภูมิ ' + this.setTemp1 + 'ถึง' + this.setTemp2,
            icon: 'success',
            confirmButtonText: 'ตกลง',
            timer: 1500,
          });
          this.fb
            .object('set/setTemp')
            .set(this.setTemp1 + ',' + this.setTemp2)
            .then(() => {
              this.service.publish(
                `/setTemp`,
                `${this.setTemp1},${this.setTemp2}`
              );
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'ทำการยกเลิก',
            icon: 'error',
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        title: 'อุหภูมิสุงเกินไป!',
        text: 'โปรดใส่ไม่เกิน 40 องศา',
        icon: 'error',
        confirmButtonText: 'ตกลง',
        timer: 1500,
      });
    }
  }
}
