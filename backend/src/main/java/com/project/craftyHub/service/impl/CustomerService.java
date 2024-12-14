package com.project.craftyHub.service.impl;

import com.project.craftyHub.model.Customer;
import com.project.craftyHub.repository.ICustomerRepository;
import com.project.craftyHub.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService implements ICustomerService
{
    @Autowired
    private ICustomerRepository repository;

    @Override
    public Customer customerRegistration(Customer customer) {
        return repository.save(customer);
    }

    @Override
    public Optional<Customer> authenticateCustomer(String email, String password) {
        return repository.findByEmailAndPassword(email,password);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public Customer updateCustomer(Customer customer) {
        return repository.save(customer);
    }

    @Override
    public void deleteCustomerById(Long id) {
        repository.deleteById(id);
    }
}
