import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetriComponent } from './cetri.component';

describe('CetriComponent', () => {
  let component: CetriComponent;
  let fixture: ComponentFixture<CetriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CetriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CetriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
