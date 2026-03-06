import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];