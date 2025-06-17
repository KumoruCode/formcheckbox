import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoInterface } from '../interfaces/tipo-interface';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  url = 'http://localhost:3000';
  private http = inject(HttpClient);

  constructor() { }

  getComunidades(number: number): Observable<TipoInterface[]> {
    return this.http.get<TipoInterface[]>(`${this.url}/comunidad${number}`);
  }
}
