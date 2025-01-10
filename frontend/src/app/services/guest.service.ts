import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GuestService {
  private apiUrl = 'http://localhost:3000/guests';

  constructor(private http: HttpClient) {}

  getGuests(page: number, limit: number) {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getGuestById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createGuest(guest: any) {
    console.log(guest);
    return this.http.post(this.apiUrl, guest);
  }

  updateGuest(id: string, guest: any) {
    return this.http.put(`${this.apiUrl}/${id}`, guest);
  }
}
