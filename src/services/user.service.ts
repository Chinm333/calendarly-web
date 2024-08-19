import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../utlis/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any = null;

  constructor(
    public readonly httpService: HttpClient
  ) { }

  async login(email: string, password: string): Promise<any> {
    const url = CONSTANTS.API_URL + `/users?email=${email}`;
    try {
      const data: any = await this.httpService.get(url).toPromise();
      if (data && data[0]?.password === password) {
        this.currentUser = data[0];
        return this.currentUser;
      }
      return null;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  }

  signup(user: any): any {
    this.currentUser = null;
    this.currentUser = user;
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
