package com.cliecy.demo.service;

import com.cliecy.demo.model.Reply;
import com.cliecy.demo.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;

    // 创建回复
    public Reply createReply(Reply reply) {
        return replyRepository.save(reply);
    }

    // 根据ID获取回复
    public Reply getReplyById(Long id) {
        return replyRepository.findById(id).orElse(null);
    }

    // 获取帖子的所有回复
    public List<Reply> getRepliesByPostId(Long postId) {
        return replyRepository.findByPostIdAndIsDeletedFalse(postId);
    }

    // 获取用户的所有回复
    public List<Reply> getRepliesByAuthorId(Long authorId) {
        return replyRepository.findByAuthorIdAndIsDeletedFalse(authorId);
    }

    // 更新回复
    public Reply updateReply(Long id, Reply replyDetails) {
        Reply reply = replyRepository.findById(id).orElse(null);
        if (reply != null) {
            reply.setContent(replyDetails.getContent());
            reply.setUpdatedAt(new Date());
            return replyRepository.save(reply);
        }
        return null;
    }

    // 安全删除（软删除）
    public void safeDeleteReplyById(Long id) {
        Reply reply = replyRepository.findById(id).orElse(null);
        if (reply != null) {
            reply.setDeleted(true);
            reply.setUpdatedAt(new Date());
            replyRepository.save(reply);
        }
    }

    // 不安全删除（物理删除）
    public void unsafeDeleteReplyById(Long id) {
        replyRepository.deleteById(id);
    }
}
