package com.example.todoapirest.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "todos")
public class Todo {
    @Id                          // This field is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment: 1, 2, 3...
    private Long id;

    @Column(nullable = false)    // This column cannot be empty / null
    private String title;

    private String description;  // Optional — no constraint

    private boolean completed = false; // Default value: not completed


}
