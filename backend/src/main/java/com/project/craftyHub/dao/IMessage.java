package com.project.craftyHub.dao;

import com.project.craftyHub.model.Customer;
import com.project.craftyHub.model.Merchant;

import java.time.LocalDateTime;

public interface IMessage
{
    Long id();

    Long senderId();

    Long receiverId();

    String content();

    LocalDateTime timestamp();

    Customer customer();

    Merchant merchant();
}
