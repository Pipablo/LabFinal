import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { TasksInterface } from '../interfaces/tasks';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<TasksInterface[]>([]);

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TasksInterface[]> {
    return this.http.get<TasksInterface[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }
  setTasks(tasks: TasksInterface[]): void {
    this.tasks.set(tasks);
  }

  getTaskById(id: string): Observable<TasksInterface | null> {
    const task = this.tasks().find((p) => String(p.id) === id) || null;
    return of(task).pipe(delay(300));
  }
}
