package com.project.craftyHub.repository;

import com.project.craftyHub.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IMessageRepository extends JpaRepository<Message,Long>
{
    @Query(value = "SELECT * FROM message WHERE (sender_id = ?1 AND receiver_id = ?2) OR (sender_id = ?2 AND receiver_id = ?1) ORDER BY timestamp ASC",nativeQuery = true)
    List<Message> findMessagesBetweenMerchantAndCustomer(Long senderId, Long receiverId);
}

