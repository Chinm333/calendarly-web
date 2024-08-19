import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalendarModule } from './components/calendar/calendar.module';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './components/appointment/login/login.component';
import { SignupComponent } from './components/appointment/signup/signup.component';
import { CreateAppointmentComponent } from './components/appointment/create-appointment/create-appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgbModule,
    LoginComponent,
    SignupComponent,
    CreateAppointmentComponent,
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  exports:[
    LoginComponent,
    SignupComponent,
    CreateAppointmentComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
