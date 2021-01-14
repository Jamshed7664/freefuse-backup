import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithOutLoginFooterComponent } from './withOutLoginFooter.component';

describe('WithOutLoginFooterComponent', () => {
  let component: WithOutLoginFooterComponent;
  let fixture: ComponentFixture<WithOutLoginFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithOutLoginFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithOutLoginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
