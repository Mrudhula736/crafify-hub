package com.project.craftyHub.service;

import com.project.craftyHub.model.Customer;

import java.util.List;
import java.util.Optional;

public interface ICustomerService
{
    Customer customerRegistration(Customer customer);

    Optional<Customer> authenticateCustomer(String email, String password);

    List<Customer> getAllCustomers();

    Customer getCustomerById(Long id);

    Customer updateCustomer(Customer customer);

    void deleteCustomerById(Long id);
}
