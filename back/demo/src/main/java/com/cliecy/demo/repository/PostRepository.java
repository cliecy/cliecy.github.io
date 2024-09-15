package com.cliecy.demo.repository;

import com.cliecy.demo.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}