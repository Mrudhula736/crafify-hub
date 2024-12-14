package com.project.craftyHub.service.impl;

import com.project.craftyHub.model.Product;
import com.project.craftyHub.repository.IProductRepository;
import com.project.craftyHub.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService
{
    @Autowired
    private IProductRepository repository;

    @Override
    public Product addProduct(Product product) {
        return repository.save(product);
    }

    @Override
    public Product getProductById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @Override
    public List<Product> getProductByMerchantId(Long merchantId) {
        return repository.getProductsByMerchantId(merchantId);
    }

    @Override
    public Product updateProduct(Product product) {
        return repository.save(product);
    }

    @Override
    public void deleteProductById(Long id) {
        repository.deleteById(id);
    }
}
