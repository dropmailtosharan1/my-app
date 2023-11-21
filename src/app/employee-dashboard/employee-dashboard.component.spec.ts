import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeDashboardComponent } from './employee-dashboard.component';

describe('EmployeeDashboardComponent', () => {
  let component: EmployeeDashboardComponent;
  let fixture: ComponentFixture<EmployeeDashboardComponent>;
  let formBuilder: FormBuilder;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDashboardComponent],
      providers: [FormBuilder, ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboardComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required fields', () => {
    expect(component.formValue).toBeInstanceOf(FormGroup);
    expect(component.formValue.controls['firstName'].validator).toBe(Validators.required);
    expect(component.formValue.controls['lastName'].validator).toBe(Validators.required);
    expect(component.formValue.controls['email'].validator).toBe(Validators.required);
    expect(component.formValue.controls['location'].validator).toBe(Validators.required);
    expect(component.formValue.controls['mobile'].validator).toBe(Validators.required);
    expect(component.formValue.controls['salary'].validator).toBe(Validators.required);
  });

  it('should reset the form and set showAdd and showUpdate to true on clickAddEmployee', () => {
    component.formValue.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      location: 'New York',
      mobile: '1234567890',
      salary: '50000',
    });

    component.clickAddEmployee();

    expect(component.formValue.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      mobile: '',
      salary: '',
    });
    expect(component.showAdd).toBe(true);
    expect(component.showUpdate).toBe(false);
  });

  it('should call postEmployee method and reset the form on postEmployeeDetails', () => {
    // spyOn(apiService, 'postEmployee').and.returnValue({ subscribe: () => {} });
    spyOn(window, 'alert');
    // spyOn(document, 'getElementById').and.returnValue({ click: () => {} });
    spyOn(component, 'getAllEmployee');

    component.formValue.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      location: 'New York',
      mobile: '1234567890',
      salary: '50000',
    });

    component.postEmployeeDetails();

    expect(apiService.postEmployee).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      location: 'New York',
      mobile: '1234567890',
      salary: '50000',
    });
    expect(window.alert).toHaveBeenCalledWith('Employee Details Added Successfully');
    expect(document.getElementById).toHaveBeenCalledWith('cancel');
    expect(component.formValue.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      mobile: '',
      salary: '',
    });
    expect(component.getAllEmployee).toHaveBeenCalled();
  });

  // Write similar test cases for other methods

});