package com.project.craftyHub.service;


import com.project.craftyHub.model.Payment;

import java.util.List;

public interface IPaymentService
{
    Payment makePayment(Payment payment);

    List<Payment> getPaymentsByMerchantId(Long merchantId);

    List<Payment> getAllPayments();

    Payment getPaymentById(Long id);
    List<Payment> getPaymentsByCustomerId(Long customerId);
    void deletePaymentById(Long id);
}
