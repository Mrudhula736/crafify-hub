package com.project.craftyHub.repository;

import com.project.craftyHub.model.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMerchantRepository extends JpaRepository<Merchant,Long>
{
    Merchant findByEmailAndPassword(String email,String password);
}
