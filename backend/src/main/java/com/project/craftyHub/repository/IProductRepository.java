package com.project.craftyHub.repository;

import com.project.craftyHub.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product,Long>
{
    List<Product> getProductsByMerchantId(Long merchantId);

    List<Product> findByMerchantId(Long merchantId);
}
