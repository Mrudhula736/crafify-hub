package com.project.craftyHub.controller;

import com.project.craftyHub.model.Merchant;
import com.project.craftyHub.service.IMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/merchant")
@CrossOrigin("*")
public class MerchantController
{
    @Autowired
    private IMerchantService service;

    @PostMapping
    private ResponseEntity<?> merchantRegister(@RequestBody Merchant merchant)
    {
        HashMap<String, Object> res = new HashMap<>();
        try
        {
            service.addMerchant(merchant);
            res.put("success",true);
            res.put("msg","Merchant Registration successful");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Merchant registration failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping
    private ResponseEntity<?> getAllMerchants()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Merchant> merchants = service.getAllMerchants();
            res.put("success",true);
            res.put("merchants",merchants);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the available merchants");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getMerchantById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            Merchant merchant = service.getMerchantById(id);
            res.put("success",true);
            res.put("merchant",merchant);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",true);
            res.put("msg","Failed to fetch the available merchant by provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<?> updateMerchant(@PathVariable Long id,@RequestBody Merchant merchant)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            Merchant merchant1 = service.getMerchantById(id);

            if (merchant1 == null)
            {
                res.put("success",false);
                res.put("msg","merchant is not found for provided id is"+id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
            }
            merchant1.setName(merchant.getName());
            merchant1.setEmail(merchant.getEmail());
            merchant1.setPassword(merchant.getPassword());
            merchant1.setMobileNumber(merchant.getMobileNumber());
            merchant1.setAddress(merchant.getAddress());

            service.updateMerchant(merchant1);
            res.put("success",true);
            res.put("msg","merchant updated Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to update the merchant");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteMerchant(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteMerchantById(id);
            res.put("success",true);
            res.put("msg","Merchant Deleted Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to delete the merchant by provided id is"+id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
    }
}
