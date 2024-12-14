package com.project.craftyHub.controller;

import com.project.craftyHub.dto.MessageRequest;
import com.project.craftyHub.model.Customer;
import com.project.craftyHub.model.Merchant;
import com.project.craftyHub.model.Message;
import com.project.craftyHub.service.ICustomerService;
import com.project.craftyHub.service.IMerchantService;
import com.project.craftyHub.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/message")
@CrossOrigin("*")
public class MessageController
{
    @Autowired
    private IMessageService service;

    @Autowired
    private IMerchantService merchantService;

    @Autowired
    private ICustomerService customerService;

    @GetMapping("/{sender}/{receiver}")
    public ResponseEntity<?> getMessages(@PathVariable Long sender, @PathVariable Long receiver)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Message> messages = service.getMessages(sender,receiver);
            res.put("success",true);
            res.put("msg",messages);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the conversation");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }

    }

    @PostMapping("/merchant/{senderId}/{receiverId}")
    public ResponseEntity<?> chattingBetweenMerchantAndCustomer(@PathVariable Long senderId, @PathVariable Long receiverId, @RequestBody MessageRequest request) {
        HashMap<String, Object> response = new HashMap<>();

        try {
            Merchant merchant = merchantService.getMerchantById(senderId);
            Customer customer = customerService.getCustomerById(receiverId);

            if (merchant == null || customer == null) {
                response.put("success", false);
                response.put("msg", "Invalid sender or receiver");
                return ResponseEntity.badRequest().body(response);
            }

            Message message = Message.builder()
                    .senderId(senderId)
                    .receiverId(receiverId)
                    .merchant(merchant)
                    .customer(customer)
                    .content(request.getContent())
                    .timestamp(LocalDateTime.now())
                    .build();

            service.chattingBetweenMerchantAndCustomer(message);
            response.put("success", true);
            response.put("msg", "Message successfully sent");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("msg", "Message sending failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/customer/{senderId}/sending/{receiverId}")
    public ResponseEntity<?> customerSendingMessageToMerchant(
            @PathVariable Long senderId,
            @PathVariable Long receiverId,
            @RequestBody MessageRequest request){

        HashMap<String,Object> res = new HashMap<>();

        try {
            Customer customer = customerService.getCustomerById(senderId);
            Merchant merchant = merchantService.getMerchantById(receiverId);

            if (customer != null && merchant != null) {
                Message message = Message.builder()
                        .senderId(senderId)
                        .receiverId(receiverId)
                        .customer(customer)
                        .merchant(merchant)
                        .content(request.content)
                        .timestamp(LocalDateTime.now())
                        .build();

                service.chattingBetweenCustomerAndMerchant(message);
                res.put("success", true);
                res.put("msg", "Message sent successfully");
                return ResponseEntity.status(HttpStatus.OK).body(res);
            } else {
                res.put("success", false);
                res.put("msg", "Invalid sender or receiver");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "Message sending failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
    }

    @GetMapping
    private ResponseEntity<?> getAllMessages()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Message> messages = service.getAllMessages();
            res.put("success",true);
            res.put("msg",messages);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to fetch the messages");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

}
