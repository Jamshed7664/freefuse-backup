import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishFooterComponent } from './publishFooter.component';

describe('PublishFooterComponent', () => {
  let component: PublishFooterComponent;
  let fixture: ComponentFixture<PublishFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
