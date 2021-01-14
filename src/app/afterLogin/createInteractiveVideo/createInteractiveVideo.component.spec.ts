import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInteractiveVideoComponent } from './createInteractiveVideo.component';

describe('CreateInteractiveVideoComponent', () => {
  let component: CreateInteractiveVideoComponent;
  let fixture: ComponentFixture<CreateInteractiveVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInteractiveVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInteractiveVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
