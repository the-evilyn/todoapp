package com.example.todoapirest.controller;

import com.example.todoapirest.model.Todo;
import com.example.todoapirest.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController              // Returns JSON responses
@RequestMapping("/api/todos") // All endpoints start with /api/todos
@CrossOrigin(origins = "*") // Allow Angular to call us
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    // GET /api/todos -> returns all todos
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    // GET /api/todos/1 -> returns todo with id=1
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.getTodoById(id));
    }

    // POST /api/todos -> creates a new todo
    // @RequestBody converts incoming JSON into a Todo Java object
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(todoService.createTodo(todo));
    }

    // PUT /api/todos/1 -> updates todo with id=1
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id,
                                           @RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.updateTodo(id, todo));
    }

    // DELETE /api/todos/1 -> deletes todo with id=1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
