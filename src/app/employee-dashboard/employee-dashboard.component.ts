import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeDashboardModule } from './employee-dashboard.module';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModuleObj: EmployeeDashboardModule = new EmployeeDashboardModule();
  employeeData!: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails() {
    this.employeeModuleObj.firstName = this.formValue.value.firstName;
    this.employeeModuleObj.lastName = this.formValue.value.lastName;
    this.employeeModuleObj.email = this.formValue.value.email;
    this.employeeModuleObj.mobile = this.formValue.value.mobile;
    this.employeeModuleObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModuleObj).subscribe(
      res => {
        console.log(res);
        alert('Employee Details Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err) => {
        alert('Some error will be defined let me check it once....!');
      }
    );
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    });
  }

  deleteEmployee(row:any) {
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert('Employee Deleted');
      this.getAllEmployee();
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModuleObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  
  updateEmployeeDetails(){
    this.employeeModuleObj.firstName=this.formValue.value.firstName;
    this.employeeModuleObj.lastName=this.formValue.value.lastName;
    this.employeeModuleObj.email=this.formValue.value.email;
    this.employeeModuleObj.mobile=this.formValue.value.mobile;
    this.employeeModuleObj.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModuleObj, this.employeeModuleObj.id).subscribe(res=>{
      alert("Employee details Updated Succesfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
