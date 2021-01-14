import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVideosComponent } from './uploadVideos.component';

describe('UploadVideosComponent', () => {
  let component: UploadVideosComponent;
  let fixture: ComponentFixture<UploadVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
