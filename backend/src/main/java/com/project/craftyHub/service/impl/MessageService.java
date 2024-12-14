package com.project.craftyHub.service.impl;

import com.project.craftyHub.model.Message;
import com.project.craftyHub.repository.IMessageRepository;
import com.project.craftyHub.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService implements IMessageService
{
    @Autowired
    private IMessageRepository messageRepository;


    @Override
    public void chattingBetweenMerchantAndCustomer(Message message) {
        messageRepository.save(message);
    }

    @Override
    public void chattingBetweenCustomerAndMerchant(Message message) {
        messageRepository.save(message);
    }

    @Override
    public List<Message> getAllMessages(){
        return messageRepository.findAll();
    }

    @Override
    public List<Message> getMessages(Long sender, Long receiver) {
        return messageRepository.findMessagesBetweenMerchantAndCustomer(sender, receiver);
    }
}

