import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  public isCollapsed: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleCollapse(event: any) {
    console.log('aria-expaned: ', event);
    this.isCollapsed = !this.isCollapsed;
    event.target.ariaExpanded = this.isCollapsed;
    // console.log('isCollapsed before: ', this.isCollapsed);
  }

}
