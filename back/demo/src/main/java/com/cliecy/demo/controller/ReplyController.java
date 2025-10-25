package com.cliecy.demo.controller;

import com.cliecy.demo.model.Reply;
import com.cliecy.demo.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/replies")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    // 根据ID获取回复
    @GetMapping("/{id}")
    public Reply getReplyById(@PathVariable Long id) {
        return replyService.getReplyById(id);
    }

    // 根据帖子ID获取所有回复
    @GetMapping("/post/{postId}")
    public List<Reply> getRepliesByPostId(@PathVariable Long postId) {
        return replyService.getRepliesByPostId(postId);
    }

    // 根据用户ID获取所有回复
    @GetMapping("/author/{authorId}")
    public List<Reply> getRepliesByAuthorId(@PathVariable Long authorId) {
        return replyService.getRepliesByAuthorId(authorId);
    }

    // 创建新回复
    @PostMapping
    public Reply createReply(@RequestBody Reply reply) {
        return replyService.createReply(reply);
    }

    // 根据ID更新回复
    @PutMapping("/{id}")
    public Reply updateReplyById(@PathVariable Long id, @RequestBody Reply replyDetails) {
        return replyService.updateReply(id, replyDetails);
    }

    // 不安全地删除回复
    @DeleteMapping("/{id}")
    public void unsafeDeleteReplyById(@PathVariable Long id) {
        replyService.unsafeDeleteReplyById(id);
    }

    // 安全地删除回复（软删除）
    @DeleteMapping("/{id}/safe")
    public void safeDeleteReplyById(@PathVariable Long id) {
        replyService.safeDeleteReplyById(id);
    }
}
