package com.project.craftyHub.controller;

import com.project.craftyHub.model.Customer;
import com.project.craftyHub.model.CustomizeProduct;
import com.project.craftyHub.model.Merchant;
import com.project.craftyHub.repository.ICustomerRepository;
import com.project.craftyHub.service.ICustomerService;
import com.project.craftyHub.service.ICustomizeProductService;
import com.project.craftyHub.service.IMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/customizedProduct")
@CrossOrigin("*")
public class CustomizedProductController
{
    @Autowired
    private ICustomizeProductService service;

    @Autowired
    private ICustomerService customerService;

    @Autowired
    private IMerchantService merchantService;

    @PostMapping("/{customerId}/customized/{merchantId}")
    private ResponseEntity<?> addCustomizedProduct(
            @PathVariable("merchantId") Long merchantId,
            @PathVariable("customerId") Long customerId,
            @RequestParam("productName") String productName,
            @RequestParam("productDescription") String productDescription,
            @RequestParam("price") Double price,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("image") MultipartFile image,
            @RequestParam Map<String, String> specifications // Customizable specifications
    ) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            // Validate input parameters
            if (productName.isEmpty() || productDescription.isEmpty() || price <= 0 || quantity <= 0 || image.isEmpty()) {
                res.put("success", false);
                res.put("msg", "Please provide valid product details.");
                return ResponseEntity.badRequest().body(res);
            }

            // Create directory for storing images if not exists
            Path imagePath = Paths.get("src", "main", "resources", "static", "Images");
            Files.createDirectories(imagePath);

            // Generate unique file name to avoid conflicts
            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();

            // Save the image file
            Path filePath = imagePath.resolve(fileName);
            image.transferTo(filePath);

            // Construct URL for accessing the image
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/Images/")
                    .path(fileName)
                    .toUriString();

            // Retrieve merchant by ID
            Merchant merchant = merchantService.getMerchantById(merchantId);

            Customer customer = customerService.getCustomerById(customerId);

            // Create product object
            CustomizeProduct product = new CustomizeProduct();
            product.setMerchant(merchant);
            product.setCustomer(customer);
            product.setProductName(productName);
            product.setProductDescription(productDescription);
            product.setImageUrl(imageUrl);
            product.setSpecifications(specifications);
            product.setRequestDate(LocalDateTime.now());
            product.setApproved(false);

            // Add product using service
            service.addCustomizeProduct(product);


            // Populate success response
            res.put("success", true);
            res.put("msg", "Customized product added successfully.");
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        } catch (IOException e) {
            res.put("success", false);
            res.put("msg", "Failed to upload image. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "Failed to add the product.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{customerId}")
    private ResponseEntity<?> getCustomizedProductByCustomerId(@PathVariable Long customerId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<CustomizeProduct> customizeProducts = service.getProductByCustomerId(customerId);
            res.put("success",true);
            res.put("customizedProduct",customizeProducts);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the customized products by customer id is"+customerId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping("/get/{merchantId}")
    private ResponseEntity<?> getCustomizedProductByMerchantId(@PathVariable Long merchantId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<CustomizeProduct> customizeProducts = service.getProductByMerchantId(merchantId);
            res.put("success",true);
            res.put("customizedProduct",customizeProducts);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the customized products by merchant id is"+merchantId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @PutMapping("/{productId}/accept")
    public CustomizeProduct acceptMerchantApproval(@PathVariable Long productId)
    {
        return service.acceptMerchantApproval(productId);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteCustomizedProductById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteCustomizedProductById(id);
            res.put("success",true);
            res.put("msg","CustomizedProduct deleted Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to delete the CustomizedProduct by provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
