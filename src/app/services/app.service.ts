import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country.model';
import { State } from '../model/state.model';


@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {}

    getCountryList(): Observable<any> {
        let url = environment.api.master.getAllCountry;
       
         return this.http.get(url);
      
    }

    getStateList(country: any): Observable<any> {
       
        
        const  url = `${environment.api.master.getState}${country}`;
         return this.http.get(url);
      
    }
}