import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  template: `
    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <h1>{{ appTitle }}</h1>
        </div>

        <nav class="navigation">
          <ul>
            <li><a [routerLink]="['/home']">Home</a></li>
            <li><a [routerLink]="['/tasks']">Tasks</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .app-header {
        background: linear-gradient(90deg, #a56600ff, #fda129ff);
        color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 300;
      }

      .navigation ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 2rem;
      }

      .navigation a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        transition: opacity 0.3s;
      }

      .navigation a:hover {
        opacity: 0.8;
      }

      .user-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .user-name {
        font-weight: 500;
      }

      .btn-login,
      .btn-logout {
        padding: 0.5rem 1rem;
        border: 2px solid white;
        background: transparent;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .btn-login:hover,
      .btn-logout:hover {
        background: white;
        color: #2c3e50;
      }

      @media (max-width: 768px) {
        .header-content {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .navigation ul {
          justify-content: center;
        }
      }
    `,
  ],
})
export class Header {
  @Input() appTitle = 'LabFinal';
  @Output() navigationClick = new EventEmitter<string>();

  navigate(section: string) {
    this.navigationClick.emit(section);
  }
}
