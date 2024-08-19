import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../../../utlis/constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SignupComponent {
  signupForm: FormGroup;
  @Output() signupSuccess = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public readonly httpService: HttpClient,
    private modalService: NgbModal,
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const newUser = this.userService.signup(this.signupForm.value);
      if (newUser) {
        const url = CONSTANTS.API_URL + '/users';
        this.httpService.post(url, newUser).subscribe(data => {
          this.modalService.dismissAll();
          this.signupSuccess.emit();
        })
      } else {
        console.log("failed to signup");
      }
    }
  }
}
