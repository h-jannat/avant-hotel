import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CreateReservationDto from './dto/create_reservation.dto';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) {}

  getReservations(page: number, limit: number) {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getReservationById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createReservation(reservation: CreateReservationDto) {
    return this.http.post(this.apiUrl, reservation);
  }

  updateReservation(id: string, reservation: any) {
    return this.http.put(`${this.apiUrl}/${id}`, reservation);
  }

  deleteReservation(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
