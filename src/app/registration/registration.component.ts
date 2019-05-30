import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm:FormGroup = new FormGroup({
    'title': new FormControl(),
    'name': new FormControl(),
    'surname':new FormControl(),
    'address': new FormControl(),
    'postcode': new FormControl(),
    'city': new FormControl(),
    'email':new FormControl(),
    'telNumber': new FormControl(),
    'birthdate': new FormControl(),
    'note': new FormControl(),
    'password':new FormControl(),
    'confirmPassword':new FormControl(),
    'captcha':new FormControl(),
    'agree':new FormControl()
  });
  siteKey: string = environment.siteKey;
  successRegistration: boolean;
  passwordPattern: string = environment.passwordPattern;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  registration(){
    let params = this.getParams();
    let url = environment.snkokBackOfficeUrl + "/signup";
    this.http.post(encodeURI(url), params).subscribe( resp => {
      this.successRegistration = true;
    },
      error => {
        console.log(error);
        this.successRegistration = false;
      });
  }

  private getParams():HttpParams {
    let params = new HttpParams();
    Object.keys(this.registrationForm.controls).forEach(key=>{
      if(!['confirmPassword', 'captcha', 'agree'].includes(key) && this.registrationForm.controls[key].value)
        params = params.set(key, this.registrationForm.controls[key].value);
    });
    return params
  }
}
