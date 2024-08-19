import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONSTANTS } from '../../../../utlis/constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../services/user.service';
declare var $: any;
@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CreateAppointmentComponent {
  appointmentForm: FormGroup;
  reminders = ['email', 'popup'];
  recurrenceOptions = ['none', 'daily', 'weekly', 'monthly', 'yearly'];
  statusOptions = ['confirmed', 'tentative', 'cancelled'];

  constructor(
    private fb: FormBuilder,
    public readonly httpService: HttpClient,
    private modalService: NgbModal,
    public readonly userService: UserService,
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      location: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      isAllDay: [false],
      reminders: [[]],
      recurrence: ['none'],
      status: ['confirmed'],
      attendees: [[], Validators.required],
    });
  }

  async onSubmit() {
    if (this.appointmentForm.valid) {
      const appointment = this.appointmentForm.value;
      const currentUser = this.userService.getCurrentUser();
      appointment.createdBy = currentUser.email;
      const url = CONSTANTS.API_URL + '/appointments';
      this.httpService.post(url, appointment).subscribe(data => {
        this.modalService.dismissAll();
      })
    }
  }
}

