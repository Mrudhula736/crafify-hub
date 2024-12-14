package com.project.craftyHub.repository;

import com.project.craftyHub.model.CustomizeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICustomizeProductRepository extends JpaRepository<CustomizeProduct,Long>
{
    List<CustomizeProduct> findByCustomerId(Long customerId);

    List<CustomizeProduct> findByMerchantId(Long merchantId);

}
