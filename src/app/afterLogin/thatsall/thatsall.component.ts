import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-thatsall',
  templateUrl: './thatsall.component.html',
  styleUrls: ['./thatsall.component.css']
})
export class ThatsallComponent implements OnInit {

  constructor(public router: Router) { }
  timeLeft: number = 5;
  interval;
  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft)
      } else if (this.timeLeft == 0) {
        console.log('redirecting to dashboard');
        this.router.navigate(['/dashboard']);
        clearInterval(this.interval);
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }

}
