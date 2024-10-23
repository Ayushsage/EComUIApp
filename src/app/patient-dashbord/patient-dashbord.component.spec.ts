import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDashbordComponent } from './patient-dashbord.component';

describe('PatientDashbordComponent', () => {
  let component: PatientDashbordComponent;
  let fixture: ComponentFixture<PatientDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
