import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideosPublicComponent } from './my-videos-public.component';

describe('MyVideosPublicComponent', () => {
  let component: MyVideosPublicComponent;
  let fixture: ComponentFixture<MyVideosPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideosPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVideosPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
