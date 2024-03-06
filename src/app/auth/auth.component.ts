import {Component} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {


  readonly APP_LOGIN = 'admin';
  readonly APP_PASSWORD = 'MeowMeow';


  form = this.fb.nonNullable.group({
    login: this.fb.nonNullable.control(''),
    password: this.fb.nonNullable.control(''),
  });

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private toastrService: ToastrService,
  ) {
  }

  submit() {
    if (this.form.value.login != this.APP_LOGIN || this.form.value.password != this.APP_PASSWORD) {
      this.toastrService.error('Incorrect login or password');
    } else {
      sessionStorage.setItem('token', 'true');
      this.toastrService.success('You are logged in');
      this._router.navigateByUrl('/cats-gallery');
    }
  }
}
