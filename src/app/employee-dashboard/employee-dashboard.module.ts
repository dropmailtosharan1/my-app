import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class EmployeeDashboardModule {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';
  salary: string = '';
}
