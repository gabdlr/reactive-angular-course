import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import {Router} from '@angular/router';
import { User } from '../model/user';
import { AuthStoreService } from '../services/auth.store.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private authStoreService: AuthStoreService, 
              private fb: FormBuilder,
              private router: Router) 
  {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const val:{email:string,password:string} = this.form.value;
    this.authStoreService.login(val.email,val.password)
      .subscribe({
        next: (res: User) => this.router.navigateByUrl('/courses'),
        error: (err: HttpErrorResponse) => alert("Login failed")
      });
  }

}
