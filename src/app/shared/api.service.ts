import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  urlLink="http://localhost:3000/posts";
  constructor(private http : HttpClient) { }

  postEmployee(data:any){
    return this.http.post<any>(this.urlLink, data)
  }
  getEmployee(){
    return this.http.get<any>(this.urlLink)
  }
  updateEmployee(data:any, id:number){
    return this.http.put(this.urlLink+"/"+id ,data)
  }
  deleteEmployee(id:number){  
  return this.http.delete(this.urlLink+"/"+id)
   }
}
