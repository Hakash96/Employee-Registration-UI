import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/model/country.model';
import { Employer } from 'src/app/model/employer.model';
import { State } from 'src/app/model/state.model';
import { AppService } from 'src/app/services/app.service';
import { EmployerService } from 'src/app/services/employer.service';
import { Moment } from 'moment';
import * as moment from 'moment';




@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.scss']
})
export class EmpAddComponent implements OnInit {
  empForm!: FormGroup;
  todayDate = new Date().toISOString().split("T")[0];
  maxDate = Date.now();
  countryList: Country[] = [];
  stateList: State[] = [];
  isSubmitted = false;



  constructor(private fb: FormBuilder, private appService: AppService, private employerService: EmployerService, private route: ActivatedRoute) { 
    this.createForm();
debugger
    const employerId = this.route.snapshot.params['id'];
    if(employerId) {
      this.getEmployerById(employerId);
    }
  }

  ngOnInit(): void {
    

    
    this.getCountryList();
  }

  getEmployerById(empId: number) {
    this.employerService.getEmployer(empId).pipe().subscribe((emp: Employer) => {
      this.getState(emp.countryId);

      let dateConversion = new Date(emp.dob).toISOString().split("T")[0];
      this.empForm.patchValue({...emp, dob : dateConversion});
    });
    this.maxDate=this.empForm.value.dob;
  }


  createForm() {
    this.empForm = this.fb.group({
      employeeId : this.fb.control(''),
      employeeName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      age: this.fb.control('', [Validators.required,  Validators.maxLength(3), Validators.pattern("^[0-9]*$")]),
      mobileNum: this.fb.control('', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
      dob: this.fb.control('', [Validators.required]),
      addressLine1: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$' )]),
      addressLine2: this.fb.control(''),
      pincode: this.fb.control('', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]),
      countryId: this.fb.control('', [Validators.required]),
      stateId: this.fb.control('', [Validators.required]),
    });
  }

  getCountryList(){
    this.appService.getCountryList().subscribe((countries: Country[]) => {
      this.countryList = countries;
    });
  }
  
  getState(countryId: number) {
    this.appService.getStateList(countryId).subscribe((state: State[]) => {
      this.stateList = state;
    });
  }

  onChangeCountry() {
    const countryId = this.empForm.value.countryId;
    this.getState(countryId);
  }

  submitForm() {
    this.isSubmitted = true;
   
    if(this.empForm.valid) {
      var body = {
        ...this.empForm.value,
        employeeId : this.empForm.value.employeeId,
        stateId: +this.empForm.value.stateId,
        countryId:+this.empForm.value.countryId
        
        }
      this.employerService.addEmployer(body).subscribe((response) => {
        if (response){
          alert("Record Summited Sucessfully");
        }
        else{
          alert(response.console.error());
          
        }
      });
    }
    console.log(this.empForm.value);
  }


  CalculateAge() : any{

   var result = this.ageFromDateOfBirthday(this.empForm.value.dob)

  //   const bdate = new Date(this.empForm.value.dob);
  // const timeDiff = Math.abs(Date.now() - bdate.getTime() );
  // var ageDifMs = Math.floor((timeDiff / (31557600000)));


  //   const timeDiffs = Math.abs(Date.now() - this.empForm.value.dob);
  //  var value =  Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
 // var timeDiffs = Math.abs(Date.now() - new Date(this.empForm.value.dob).getTime());

}

// public ageFromDateOfBirthday(dateOfBirth: any): number {
//   return moment().diff(dateOfBirth, 'years');
// }
public ageFromDateOfBirthday(dateOfBirth: any): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

}
