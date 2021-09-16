import {Component, Input} from '@angular/core';

@Component({
    selector: 'timer',
    templateUrl: 'timer.html'
})
export class TimerComponent {

    @Input() timeInSeconds: number;

    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;

    public sec_num: number;
    public esconderTime: boolean;

    public daysString: string;
    public hoursString: string;
    public minutesString: string;
    public secondsString: string;

    constructor(
    ) {
    }

    ngOnInit() {
        this.timerTick();
    }

    timerTick() {
        setTimeout(() => {
          this.getSecondsAsDigitalClock();
          if(Math.round(this.sec_num) > 1){
            this.timerTick();
            this.esconderTime = true;
          }
        }, 1000);
    }

    getSecondsAsDigitalClock() {
       var dataEvent = "2017-10-17 22:31:00";
       var theevent = new Date(dataEvent);
       var dataAtual = new Date();

       this.sec_num = (+theevent - +dataAtual) / 1000;

       console.log(this.sec_num);

       this.days    = Math.floor(this.sec_num / (3600 * 24));
       this.hours   = Math.floor((this.sec_num - (this.days * (3600 * 24)))/3600);
       this.minutes = Math.floor((this.sec_num - (this.days * (3600 * 24)) - (this.hours * 3600)) / 60);
       this.seconds = Math.floor(this.sec_num - (this.days * (3600 * 24)) - (this.hours * 3600) - (this.minutes * 60));

      this.daysString = (this.days < 10) ? "0" + this.days : this.days.toString();
      this.hoursString = (this.hours < 10) ? "0" + this.hours : this.hours.toString();
      this.minutesString = (this.minutes < 10) ? "0" + this.minutes : this.minutes.toString();
      this.secondsString = (this.seconds < 10) ? "0" + this.seconds : this.seconds.toString();


      return this.daysString + ' dias '+ this.hoursString + ' horas ' + this.minutesString + ' minutos ' + this.secondsString +' segundos';
    }

}
