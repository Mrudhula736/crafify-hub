package com.project.craftyHub.controller;

import com.project.craftyHub.model.Customer;
import com.project.craftyHub.model.Merchant;
import com.project.craftyHub.service.ICustomerService;
import com.project.craftyHub.service.IMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class





























AuthenticationController
{
    @Autowired
    private ICustomerService service;

    @Autowired
    private IMerchantService merchantService;

    @PostMapping("/merchant")
    private ResponseEntity<?> merchantLogin(@RequestBody HashMap<String,String> login)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            String email = login.get("email");
            String password = login.get("password");
            if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
                res.put("success", false);
                res.put("msg", "Email and password fields are required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }
            Merchant merchant = merchantService.authenticateMerchant(email,password);
            if (merchant != null)
            {
                res.put("success", true);
                res.put("msg", "Merchant Login Successful");
                res.put("merchant",merchant);
                return ResponseEntity.ok().body(res);
            }
            else
            {
                res.put("success", false);
                res.put("msg", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
            }
        }
        catch (Exception e)
        {
            res.put("success", false);
            res.put("msg", "An unexpected error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PostMapping("/customer")
    private ResponseEntity<HashMap<String, Object>> customerLogin(@RequestBody HashMap<String, String> login) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            String email = login.get("email");
            String password = login.get("password");
            if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
                res.put("success", false);
                res.put("msg", "Email and password fields are required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }
            Optional<Customer> customer = service.authenticateCustomer(email, password);
            if (customer.isPresent()) {
                res.put("success", true);
                res.put("msg", "Customer Login Successful");
                res.put("customer",customer);
                return ResponseEntity.ok().body(res);
            } else {
                res.put("success", false);
                res.put("msg", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
            }
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An unexpected error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

}
