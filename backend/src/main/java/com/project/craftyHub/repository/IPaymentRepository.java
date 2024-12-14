package com.project.craftyHub.repository;


import com.project.craftyHub.model.Payment;
import com.project.craftyHub.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface IPaymentRepository extends JpaRepository<Payment,Long>
{
    List<Payment> getPaymentsByCustomerId(Long userId);

    List<Payment> findByProductId(Long productId);
}
