package com.project.craftyHub.service;

import com.project.craftyHub.model.Merchant;

import java.util.List;

public interface IMerchantService
{
    Merchant addMerchant(Merchant merchant);

    List<Merchant> getAllMerchants();

    Merchant authenticateMerchant(String email,String password);

    Merchant getMerchantById(Long id);

    Merchant updateMerchant(Merchant merchant);

    void deleteMerchantById(Long id);
}
