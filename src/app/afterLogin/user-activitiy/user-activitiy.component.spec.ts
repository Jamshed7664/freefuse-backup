import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivitiyComponent } from './user-activitiy.component';

describe('UserActivitiyComponent', () => {
  let component: UserActivitiyComponent;
  let fixture: ComponentFixture<UserActivitiyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActivitiyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivitiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
