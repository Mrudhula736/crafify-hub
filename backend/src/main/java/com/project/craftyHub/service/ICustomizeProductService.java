package com.project.craftyHub.service;

import com.project.craftyHub.model.CustomizeProduct;

import java.util.List;

public interface ICustomizeProductService
{
    CustomizeProduct addCustomizeProduct(CustomizeProduct customizeProduct);

    List<CustomizeProduct> getProductByCustomerId(Long customerId);

    List<CustomizeProduct> getProductByMerchantId(Long merchantId);

    List<CustomizeProduct> getAllCustomizedProducts();

    void deleteCustomizedProductById(Long id);

    CustomizeProduct acceptMerchantApproval(Long productId);
}
