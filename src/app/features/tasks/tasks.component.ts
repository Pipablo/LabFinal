import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TasksInterface } from '../../interfaces/tasks';
import { TasksService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="task-list-container">
      <div class="page-header">
        <h1>{{ getPageTitle() }}</h1>
        <div *ngIf="loading()" class="loading">
          <div class="spinner"></div>
          <p>Cargando tareas...</p>
        </div>
        <div
          *ngIf="!loading() && tasks().length > 0"
          class="task-table-container"
        >
          <table class="task-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let task of tasks()">
                <td>{{ task.title }}</td>
                <td>{{ task.userId }}</td>
                <td>
                  <span
                    [ngClass]="{
                      completed: task.completed,
                      pending: !task.completed
                    }"
                  >
                    {{ task.completed ? 'Completada' : 'Pendiente' }}
                  </span>
                </td>
                <td>
                  <a [routerLink]="['/tasks', task.id]" class="btn btn-primary"
                    >Ver Detalles</a
                  >
                  <button class="btn btn-outline" (click)="onEdit(task)">
                    Editar
                  </button>
                  <button class="btn btn-outline" (click)="onDelete(task)">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div *ngIf="!loading() && tasks().length === 0" class="no-tasks">
          <div class="no-tasks-icon">📦</div>
          <h3>No hay tareas</h3>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./tasks.component.scss'],
})
export class Tasks implements OnInit {
  private task = inject(TasksService);
  private route = inject(ActivatedRoute);
  tasks = signal<TasksInterface[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.loadTasks();
    });
  }

  private loadTasks(): void {
    this.loading.set(true);
    const request = this.task.getAllTasks();

    request.subscribe({
      next: (taskInterface) => {
        this.tasks.set(taskInterface);
        this.task.setTasks(taskInterface);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.loading.set(false);
      },
    });
  }

  getPageTitle(): string {
    return 'Tareas';
  }

  onEdit(task: TasksInterface) {
    // Implementar lógica de edición aquí
    console.log('Editar tarea:', task);
  }

  onDelete(task: TasksInterface) {
    // Implementar lógica de eliminación aquí
    console.log('Eliminar tarea:', task);
  }
}
