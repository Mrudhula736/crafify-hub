package com.project.craftyHub.service;

import com.project.craftyHub.model.Message;

import java.util.List;

public interface IMessageService
{
    void chattingBetweenMerchantAndCustomer(Message message);

    void chattingBetweenCustomerAndMerchant(Message message);

    List<Message> getAllMessages();

    List<Message> getMessages(Long sender, Long receiver);

}
