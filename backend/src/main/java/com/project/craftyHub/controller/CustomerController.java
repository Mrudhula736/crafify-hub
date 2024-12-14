package com.project.craftyHub.controller;

import com.project.craftyHub.model.Customer;
import com.project.craftyHub.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController
{
    @Autowired
    private ICustomerService service;

    @PostMapping
    private ResponseEntity<?> customerRegistration(@RequestBody Customer customer)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.customerRegistration(customer);
            res.put("success",true);
            res.put("msg","Customer Registration Successful");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Invalid Details");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping
    private ResponseEntity<?> getAllCustomers()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Customer> customerList = service.getAllCustomers();
            res.put("success",true);
            res.put("customer",customerList);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to fetch the available customers");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getCustomersById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            Customer customer = service.getCustomerById(id);
            res.put("success",true);
            res.put("customer",customer);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed  to fetch the available customer by provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<?> updateCustomer(@PathVariable Long id,@RequestBody Customer customer)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            Customer updateCustomer = service.getCustomerById(id);

            updateCustomer.setId(customer.getId());
            updateCustomer.setName(customer.getName());
            updateCustomer.setEmail(customer.getEmail());
            updateCustomer.setPassword(customer.getPassword());
            updateCustomer.setMobile(customer.getMobile());
            updateCustomer.setAddress(customer.getAddress());

            service.updateCustomer(updateCustomer);
            res.put("success",true);
            res.put("msg","customer updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to update the customer for provided id is"+id);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteCustomerById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteCustomerById(id);
            res.put("success",true);
            res.put("msg","customer deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to delete the customer by provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
