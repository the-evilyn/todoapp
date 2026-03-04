package com.example.todoapirest.service;

import com.example.todoapirest.model.Todo;
import com.example.todoapirest.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor // Lombok: injects dependencies via constructor automatically
public class TodoService {

    private final TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));
    }public Todo createTodo(Todo todo) {
        return todoRepository.save(todo); // save() = INSERT when id is null
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo existing = getTodoById(id);
        existing.setTitle(updatedTodo.getTitle());
        existing.setDescription(updatedTodo.getDescription());
        existing.setCompleted(updatedTodo.isCompleted());
        return todoRepository.save(existing); // save() = UPDATE when id exists
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
