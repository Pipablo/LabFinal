import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksInterface } from '../../interfaces/tasks';
import { TasksService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule],
  styleUrls: ['./task-details.component.scss'],
  template: `
    <div class="task-list-container">
      <div class="page-header">
        <h1>{{ getPageTitle() }}</h1>
        <div *ngIf="loading()" class="loading">
          <div class="spinner"></div>
          <p>Cargando tareas...</p>
        </div>
        <div *ngIf="!loading() && tasks() !== null" class="task-grid">
          <div class="task-card">
            <div class="task-info">
              <h3 class="task-titulo">{{ tasks()?.title }}</h3>
              <p class="task-usuario">{{ tasks()?.userId }}</p>
              <p class="task-id">ID: {{ tasks()?.id }}</p>
              <p class="task-completed">
                Estado:
                <span
                  [ngClass]="{
                    completed: tasks()?.completed,
                    pending: !tasks()?.completed
                  }"
                  >{{ tasks()?.completed ? 'Completada' : 'Pendiente' }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <div *ngIf="!loading() && tasks() === null" class="no-tasks">
          <div class="no-tasks-icon">📦</div>
          <h3>No se encontró la tarea</h3>
        </div>
      </div>
    </div>
  `,
})
export class TaskDetailsComponent {
  private task = inject(TasksService);
  private route = inject(ActivatedRoute);
  tasks = signal<TasksInterface | null>(null);
  loading = signal(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.loadTaskById(params.get('id'));
    });
  }

  private loadTaskById(id: string | null): void {
    this.loading.set(true);
    const request = this.task.getTaskById(id || '');

    request.subscribe({
      next: (task) => {
        this.tasks.set(task);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.loading.set(false);
      },
    });
  }
  getPageTitle(): string {
    return 'Detalle de la tarea';
  }
}
