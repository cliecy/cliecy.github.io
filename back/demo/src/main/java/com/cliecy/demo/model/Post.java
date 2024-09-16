package com.cliecy.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Post {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Long authorId;
    private String content;
    private int floor;
    private boolean isLocked;
    private boolean isDeleted;
    private boolean isTop;
    private boolean isInvisible;
    private Date createdAt;
    private Date updatedAt;

}