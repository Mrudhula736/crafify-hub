package com.project.craftyHub.service.impl;


import com.project.craftyHub.model.Payment;
import com.project.craftyHub.model.Product;
import com.project.craftyHub.repository.IPaymentRepository;
import com.project.craftyHub.repository.IProductRepository;
import com.project.craftyHub.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
public class PaymentService implements IPaymentService
{
    @Autowired
    private IPaymentRepository repository;

    @Autowired
    private IProductRepository productRepository;

    @Override
    public Payment makePayment(Payment payment) {
         // Perform additional validation
        if (!isValidCreditCardNumber(payment.getCardNumber())) {
            throw new IllegalArgumentException("Invalid credit card number");
        }

        if (!isValidExpiryDate(payment.getExpiryDate())) {
            throw new IllegalArgumentException("Invalid expiry date");
        }

        if (!isValidCvv(payment.getCvv())) {
            throw new IllegalArgumentException("Invalid CVV");}

        return repository.save(payment);
    }

    private boolean isValidCreditCardNumber(String cardNumber) {
        // Remove all non-digit characters
        cardNumber = cardNumber.replaceAll("\\D", "");
        System.out.println("Card number after removing non-digits: " + cardNumber);

        // Check if the card number has 16 digits
        if (cardNumber.length() != 16) {
            return false;
        }

        // Apply Luhn algorithm
//        int sum = 0;
//        boolean alternate = false;
//        for (int i = cardNumber.length() - 1; i >= 0; i--) {
//            int digit = Integer.parseInt(cardNumber.substring(i, i + 1));
//            if (alternate) {
//                digit *= 2;
//                if (digit > 9) {
//                    digit = (digit % 10) + 1;
//                }
//            }
//            sum += digit;
//            alternate = !alternate;
//        }
        return (true);
    }

    private boolean isValidExpiryDate(LocalDate expiryDate) {
        LocalDate currentDate = LocalDate.now();
        return expiryDate.isAfter(currentDate);
    }

    @Override
    public List<Payment> getPaymentsByMerchantId(Long merchantId) {
        // Retrieve products associated with the merchantId
        List<Product> products = productRepository.findByMerchantId(merchantId);

        // Initialize a list to store payments
        List<Payment> payments = new ArrayList<>();

        // Retrieve payments associated with each product
        for (Product product : products) {
            payments.addAll(repository.findByProductId(product.getId()));
        }

        return payments;
    }

    private boolean isValidCvv(Integer cvv) {
        return cvv != null && cvv >= 100 && cvv <= 999;
    }

    @Override
    public List<Payment> getAllPayments() {
        return repository.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Payment> getPaymentsByCustomerId(Long customerId) {
        return repository.getPaymentsByCustomerId(customerId);
    }

    @Override
    public void deletePaymentById(Long id) {
        repository.deleteById(id);
    }
}
