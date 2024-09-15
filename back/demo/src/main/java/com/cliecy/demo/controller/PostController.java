package com.cliecy.demo.controller;

import com.cliecy.demo.model.Post;
import com.cliecy.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Create a new post
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    // Get a post by ID
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // Get all posts with pagination
    @GetMapping
    public Page<Post> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return postService.getAllPosts(pageable);
    }

    // Update a post by ID
    @PutMapping("/{id}")
    public Post updatePostById(@PathVariable Long id, @RequestBody Post postDetails) {
        return postService.updatePost(id, postDetails);
    }

    // Unsafe delete a post by ID
    @DeleteMapping("/{id}")
    public void unsafeDeletePostById(@PathVariable Long id) {
        postService.unsafeDeletePostById(id);
    }

    // Safe delete a post by ID
    @DeleteMapping("/{id}/safe")
    public void safeDeletePostById(@PathVariable Long id) {
        postService.safeDeletePostById(id);
    }
}