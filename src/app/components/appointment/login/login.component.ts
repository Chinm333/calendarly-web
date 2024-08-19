import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: NgbModal,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const user = this.userService.login(this.loginForm.value.email, this.loginForm.value.password);
      if (await user) {
        this.modalService.dismissAll();
        this.loginSuccess.emit();
      } else {
        console.log("failed to login");
      }
    }
  }
}
