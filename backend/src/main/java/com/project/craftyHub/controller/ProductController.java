package com.project.craftyHub.controller;

import com.project.craftyHub.model.Merchant;
import com.project.craftyHub.model.Product;
import com.project.craftyHub.service.IMerchantService;
import com.project.craftyHub.service.IProductService;
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
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController
{
    @Autowired
    private IProductService service;

    @Autowired
    private IMerchantService merchantService;

    @PostMapping("/{merchantId}")
    private ResponseEntity<?> addProduct(
            @PathVariable("merchantId") Long merchantId,
            @RequestParam("productName") String productName,
            @RequestParam("productDescription") String productDescription,
            @RequestParam("price") Double price,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("image") MultipartFile image
    ) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            // Validate input parameters
            if (merchantId.describeConstable().isEmpty() || productName.isEmpty() || productDescription.isEmpty() || price <= 0 || quantity <= 0 || image.isEmpty()) {
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

            Merchant merchant = merchantService.getMerchantById(merchantId);

            // Create product object
            Product product = Product.builder()
                    .merchantId(merchantId)
                    .productName(productName)
                    .productDescription(productDescription)
                    .quantity(quantity)
                    .price(price)
                    .image(imageUrl)
                    .build();

            // Add product using service
            service.addProduct(product);
            merchant.getProducts().add(product);
            merchantService.updateMerchant(merchant);

            // Populate success response
            res.put("success", true);
            res.put("msg", "Product added successfully.");
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        } catch (IOException e) {
            res.put("success", false);
            res.put("msg", "Failed to upload image. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to add the product");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{merchantId}")
    private ResponseEntity<?> getProductByMerchantId(@PathVariable Long merchantId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Product> products = service.getProductByMerchantId(merchantId);
            res.put("success",true);
            res.put("products",products);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the products by merchant id is"+ merchantId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping
    private ResponseEntity<?> getAllProducts()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Product> products = service.getAllProducts();
            res.put("success",true);
            res.put("product",products);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the available products");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteProductById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteProductById(id);
            res.put("success",true);
            res.put("msg","product deleted Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to delete the product by provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }


}
