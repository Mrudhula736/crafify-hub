package com.project.craftyHub.service.impl;

import com.project.craftyHub.model.CustomizeProduct;
import com.project.craftyHub.repository.ICustomizeProductRepository;
import com.project.craftyHub.service.ICustomizeProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomizedProductService implements ICustomizeProductService
{
    @Autowired
    private ICustomizeProductRepository repository;

    @Override
    public CustomizeProduct addCustomizeProduct(CustomizeProduct customizeProduct) {
        return repository.save(customizeProduct);
    }

    @Override
    public List<CustomizeProduct> getProductByCustomerId(Long customerId) {
        return repository.findByCustomerId(customerId);
    }

    @Override
    public List<CustomizeProduct> getProductByMerchantId(Long merchantId) {
        return repository.findByMerchantId(merchantId);
    }

    @Override
    public List<CustomizeProduct> getAllCustomizedProducts() {
        return repository.findAll();
    }

    @Override
    public void deleteCustomizedProductById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public CustomizeProduct acceptMerchantApproval(Long productId) {
        CustomizeProduct customizeProduct = repository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + productId));

        // Perform any necessary business logic here

        // Set approved to true
        customizeProduct.setApproved(true);

        // Save the updated product
        return repository.save(customizeProduct);
    }
}
