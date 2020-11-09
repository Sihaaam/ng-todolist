import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private localUrl = '../assets/demo-data.json';

  public getTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.localUrl);
  }
}
