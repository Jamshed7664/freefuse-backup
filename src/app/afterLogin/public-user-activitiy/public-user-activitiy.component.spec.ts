import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicUserActivitiyComponent } from './public-user-activitiy.component';

describe('PublicUserActivitiyComponent', () => {
  let component: PublicUserActivitiyComponent;
  let fixture: ComponentFixture<PublicUserActivitiyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicUserActivitiyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicUserActivitiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
