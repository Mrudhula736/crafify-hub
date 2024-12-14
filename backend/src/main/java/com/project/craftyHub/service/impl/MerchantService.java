package com.project.craftyHub.service.impl;

import com.project.craftyHub.model.Merchant;
import com.project.craftyHub.repository.IMerchantRepository;
import com.project.craftyHub.service.IMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MerchantService implements IMerchantService
{

    @Autowired
    private IMerchantRepository repository;

    @Override
    public Merchant addMerchant(Merchant merchant) {
        return repository.save(merchant);
    }

    @Override
    public List<Merchant> getAllMerchants() {
        return repository.findAll();
    }

    @Override
    public Merchant authenticateMerchant(String email, String password) {
        return repository.findByEmailAndPassword(email, password);
    }

    @Override
    public Merchant getMerchantById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public Merchant updateMerchant(Merchant merchant) {
        return repository.save(merchant);
    }

    @Override
    public void deleteMerchantById(Long id) {
        repository.deleteById(id);
    }
}
