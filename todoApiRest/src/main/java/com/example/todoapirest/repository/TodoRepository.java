package com.example.todoapirest.repository;



import com.example.todoapirest.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // JpaRepository<Todo, Long> means:
    //   Todo = the entity we manage
    //   Long = the type of the primary key (id)
    //
    // Spring provides these methods automatically:
    //   save(todo)       -> INSERT or UPDATE
    //   findAll()        -> SELECT * FROM todos
    //   findById(id)     -> SELECT * WHERE id = ?
    //   deleteById(id)   -> DELETE WHERE id = ?
}
