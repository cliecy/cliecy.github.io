package com.cliecy.demo.controller;

import com.cliecy.demo.model.Post;
import com.cliecy.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // 根据ID获取帖子
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // 获取所有帖子，带分页
    @GetMapping
    public Page<Post> getAllPosts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return postService.getAllPosts(pageable);
    }
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    // 根据ID更新帖子
    @PutMapping("/{id}")
    public Post updatePostById(@PathVariable Long id, @RequestBody Post postDetails) {
        return postService.updatePost(id, postDetails);
    }

    // 不安全地删除帖子
    @DeleteMapping("/{id}")
    public void unsafeDeletePostById(@PathVariable Long id) {
        postService.unsafeDeletePostById(id);
    }

    // 安全地删除帖子
    @DeleteMapping("/{id}/safe")
    public void safeDeletePostById(@PathVariable Long id) {
        postService.safeDeletePostById(id);
    }
}