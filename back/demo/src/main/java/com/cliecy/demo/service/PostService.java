package com.cliecy.demo.service;

import com.cliecy.demo.model.Post;
import com.cliecy.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Create a new post
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    // Get a post by ID
    public Post getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        return post.orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    // Get all posts with pagination
    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    // Update a post by ID
    public Post updatePost(Long id, Post postDetails) {
        Post post = getPostById(id);
        post.setTitle(postDetails.getTitle());
        post.setAuthorId(postDetails.getAuthorId());
        post.setContent(postDetails.getContent());
        post.setFloor(postDetails.getFloor());
        post.setLocked(postDetails.isLocked());
        post.setDeleted(postDetails.isDeleted());
        post.setTop(postDetails.isTop());
        post.setInvisible(postDetails.isInvisible());
        return postRepository.save(post);
    }

    // Unsafe delete a post by ID
    public void unsafeDeletePostById(Long id) {
        postRepository.deleteById(id);
    }

    // Safe delete a post by ID
    public void safeDeletePostById(Long id) {
        Post post = getPostById(id);
        post.setDeleted(true);
        postRepository.save(post);
    }
}