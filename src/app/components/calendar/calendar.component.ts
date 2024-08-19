import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../../utlis/constant';
import { LoginComponent } from '../appointment/login/login.component';
import { SignupComponent } from '../appointment/signup/signup.component';
import { CreateAppointmentComponent } from '../appointment/create-appointment/create-appointment.component';
import { UserService } from '../../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatListModule,
    LoginComponent,
    SignupComponent,
    CreateAppointmentComponent,
  ]
})
export class CalendarComponent {
  currentUser: any = null;
  selected: Date = new Date();
  appointments: any[] = [];
  constructor(
    public readonly httpService: HttpClient,
    private userService: UserService,
    public modalService: NgbModal,
    private cdr: ChangeDetectorRef,
  ) {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser) {
      this.getAppointments();
    }
  }
  async getAppointments() {
    const date = this.formatDate(this.selected);
    if(this.currentUser == null) return
    const url = CONSTANTS.API_URL + `/appointments?email=${this.currentUser?.email}&date=${date}`;
    this.httpService.get<any[]>(url).subscribe(data => {
      this.appointments = data;
      this.cdr.detectChanges();
    })
  };

  getData() {
    this.getAppointments();
  }

  formatDate(date: Date): string {
    const dateString = date.toString();
    const index = dateString.indexOf('(');
    if (index !== -1) {
      return dateString.substring(0, index).trim();
    }
    return dateString;
  }


  onLogout() {
    this.userService.logout();
    this.currentUser = null;
    this.appointments = [];
  }
  openModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
  onLoginSuccess() {
    this.currentUser = this.userService.getCurrentUser();
    this.getAppointments();
  }

  onSignupSuccess() {
    this.currentUser = this.userService.getCurrentUser();
    this.getAppointments();
  }
}
