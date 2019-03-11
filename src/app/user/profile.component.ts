import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float: right; color: #E05C65; padding-left: 10px;}
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999 }
    .error ::-moz-placeholder { color: #999 }
    .error :-moz-placeholder { color: #999 }
    .error :ms-input-placeholder { color: #999 }

  `]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  private mdlFirstName: FormControl;
  private mdlLastName: FormControl;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
    ) {}

  ngOnInit() {
    this.mdlFirstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.mdlLastName = new FormControl(this.authService.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.mdlFirstName,
      lastName: this.mdlLastName
    });
  }

  saveProfile(formValues) {
    // Only save profile if the Reactive profile Form is valid
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      //this.router.navigate(['events']);
      this.toastr.success('Profile saved.');
    }
  }

  validateFirstName() {
    return this.mdlFirstName.valid || this.mdlFirstName.untouched;
  }

  validateLastName() {
    return this.mdlLastName.valid || this.mdlLastName.untouched;
  }

  cancel() {
    this.router.navigate(['events']);
  }

}
