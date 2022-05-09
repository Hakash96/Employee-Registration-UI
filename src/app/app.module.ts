import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpAddComponent } from './components/emp-add/emp-add.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';

import {NgxPaginationModule} from 'ngx-pagination'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    EmpAddComponent,
    EmpListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatDatepickerModule,MatNativeDateModule,MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
