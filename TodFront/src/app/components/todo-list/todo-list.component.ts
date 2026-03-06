import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: Todo = { title: '', description: '', completed: false };

  // UI state
  isLoading = false;
  errorMessage = '';
  darkMode = false;

  // Edit modal state
  editingTodo: Todo | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // remember theme
    const saved = localStorage.getItem('darkMode');
    this.darkMode = saved === 'true';
    this.loadTodos();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
  }

  loadTodos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.todoService.getAllTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load todos. Check backend is running.';
        this.isLoading = false;
      }
    });
  }

  addTodo(): void {
    const title = this.newTodo.title?.trim();
    if (!title) return;

    this.errorMessage = '';
    const payload: Todo = {
      title,
      description: this.newTodo.description?.trim() || '',
      completed: false
    };

    this.todoService.createTodo(payload).subscribe({
      next: () => {
        this.newTodo = { title: '', description: '', completed: false };
        this.loadTodos();
      },
      error: () => this.errorMessage = 'Failed to add todo.'
    });
  }

  toggleCompleted(todo: Todo): void {
    if (!todo.id) return;

    const updated: Todo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id, updated).subscribe({
      next: () => (todo.completed = updated.completed),
      error: () => this.errorMessage = 'Failed to update todo.'
    });
  }

  deleteTodo(id?: number): void {
    if (!id) return;

    this.todoService.deleteTodo(id).subscribe({
      next: () => this.todos = this.todos.filter(t => t.id !== id),
      error: () => this.errorMessage = 'Failed to delete todo.'
    });
  }

  openEdit(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  closeEdit(): void {
    this.editingTodo = null;
  }

  saveEdit(): void {
    if (!this.editingTodo?.id) return;

    const payload: Todo = {
      title: this.editingTodo.title?.trim() || '',
      description: this.editingTodo.description?.trim() || '',
      completed: !!this.editingTodo.completed
    };

    if (!payload.title) return;

    this.todoService.updateTodo(this.editingTodo.id, payload).subscribe({
      next: () => {
        // update local list without full reload
        const idx = this.todos.findIndex(t => t.id === this.editingTodo!.id);
        if (idx !== -1) this.todos[idx] = { ...this.todos[idx], ...payload };
        this.closeEdit();
      },
      error: () => this.errorMessage = 'Failed to save changes.'
    });
  }

  trackById(_: number, item: Todo): number {
    return item.id ?? _;
  }
}