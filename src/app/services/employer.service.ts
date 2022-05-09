import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employer } from '../model/employer.model';

@Injectable({
    providedIn: 'root'
})
export class EmployerService {
    

    constructor(private http: HttpClient) {}

    addEmployer(data: any): Observable<any> {
        return this.http.post(environment.api.employer.addEmployer, data);
       
    }
    
    updateEmployer(empId: number): Observable<any> {
        // return this.http.put(environment.api.employer.addEmployer, data);
        return of(true);
    }

    getEmployerList(): Observable<any> {
         return this.http.get(environment.api.employer.getEmployerList);
        //return of(this.list);
    }

    getEmployer(empId: any): Observable<any> {
         return this.http.get(environment.api.employer.getEmployer + empId);
        //return of(this.list[empId-1]);
    }
}