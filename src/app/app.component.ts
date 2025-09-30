import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, Header],
  template: `
    <div class="app-container">
      <app-header [appTitle]="title" (navigationClick)="onNavigation($event)" />
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Avanade';
  showPersonalizedMessage = signal(true);
  private router = inject(Router);

  onNavigation(section: string) {
    this.router.navigate([section]);
  }
}
