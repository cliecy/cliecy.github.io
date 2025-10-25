package com.cliecy.demo.repository;

import com.cliecy.demo.model.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    // 根据帖子ID查询所有回复
    List<Reply> findByPostIdAndIsDeletedFalse(Long postId);

    // 根据帖子ID查询所有回复（包括已删除）
    List<Reply> findByPostId(Long postId);

    // 根据作者ID查询回复
    List<Reply> findByAuthorIdAndIsDeletedFalse(Long authorId);
}
