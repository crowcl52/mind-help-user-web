import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private url = "https://dev.mindhelp.mx/";

  constructor(private http: HttpClient, private store: Store<AppState>, private route: Router) { }

  getOTBooking(id) {
    let url = `${this.url}appointments/${id}`;
    return this.http.get(url)
  }
  saveOTBooking(data) {
    let url = `${this.url}appointments`;
    return this.http.post(url,data)
  }

}
