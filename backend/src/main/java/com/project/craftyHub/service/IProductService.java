package com.project.craftyHub.service;

import com.project.craftyHub.model.Product;

import java.util.List;

public interface IProductService
{
    Product addProduct(Product product);

    Product getProductById(Long id);

    List<Product> getAllProducts();

    List<Product> getProductByMerchantId(Long merchantId);

    Product updateProduct(Product product);

    void deleteProductById(Long id);
}
