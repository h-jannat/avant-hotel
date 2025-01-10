import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiUrl = 'http://localhost:3000/rooms';

  constructor(private http: HttpClient) {}

  getRooms(page: number, limit: number, sortBy: string, sortDirection: string) {
    return this.http.get(
      `${this.apiUrl}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
  }

  getRoomById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createRoom(room: any) {
    return this.http.post(this.apiUrl, room);
  }

  updateRoom(id: string, room: any) {
    return this.http.put(`${this.apiUrl}/${id}`, room);
  }
}
