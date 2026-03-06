import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
 
// @Injectable + providedIn: 'root' means Angular creates ONE shared instance
// of this service for the entire application.
@Injectable({ providedIn: 'root' })
export class TodoService {
 
  // The base URL of our Spring Boot backend
  private apiUrl = 'http://localhost:8080/api/todos';
 
  // Angular injects HttpClient automatically via the constructor
  constructor(private http: HttpClient) {}
 
  // Observable<Todo[]> is an async stream — like a Promise but more powerful
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
 
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }
 
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }
 
  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }
 
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
