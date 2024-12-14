package com.project.craftyHub.controller;


import com.project.craftyHub.model.Customer;
import com.project.craftyHub.model.Payment;
import com.project.craftyHub.model.Product;
import com.project.craftyHub.service.ICustomerService;
import com.project.craftyHub.service.IPaymentService;
import com.project.craftyHub.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
public class PaymentController 
{
    @Autowired
    private IPaymentService service;

    @Autowired
    private IProductService productService;

    @Autowired
    private ICustomerService customerService;


    @PostMapping("/make/{productId}/{customerId}")
    public ResponseEntity<?> makePayment(@PathVariable Long productId,@RequestBody Payment payment,@PathVariable Long customerId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try {
            Product product = productService.getProductById(productId);
            Customer customer = customerService.getCustomerById(customerId);
            payment.setProduct(product);
            payment.setCustomer(customer);
            service.makePayment(payment);
            res.put("success",true);
            res.put("msg","Payment Successfully Completed");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (IllegalArgumentException e) {
            res.put("success",false);
            res.put("msg","Payment Failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
    @GetMapping
    private ResponseEntity<?> getAllPayments()
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Payment> payments = service.getAllPayments();
            res.put("success",true);
            res.put("Payments",payments);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the available Payments");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getPaymentsById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            Payment payment = service.getPaymentById(id);
            res.put("success",true);
            res.put("Payment",payment);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the payments for the provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }


    @GetMapping("/get/{customerId}")
    private ResponseEntity<?> getPaymentDetailsOfCustomers(@PathVariable Long customerId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Payment> payments = service.getPaymentsByCustomerId(customerId);
            res.put("success",true);
            res.put("Payments",payments);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the payment details by provided user id is"+customerId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping("/merchant/{merchantId}/get")
    private ResponseEntity<?> getPaymentDetailsOfMerchants(@PathVariable Long merchantId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Payment> payments = service.getPaymentsByMerchantId(merchantId);
            res.put("success",true);
            res.put("Payments",payments);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the payment details by provided merchant id is"+merchantId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> deletePaymentsById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            service.deletePaymentById(id);
            res.put("success",true);
            res.put("msg","Payment successfully deleted");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to delete the payment id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
