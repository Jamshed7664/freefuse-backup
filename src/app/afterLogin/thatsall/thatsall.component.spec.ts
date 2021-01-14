import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThatsallComponent } from './thatsall.component';

describe('ThatsallComponent', () => {
  let component: ThatsallComponent;
  let fixture: ComponentFixture<ThatsallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThatsallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThatsallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
