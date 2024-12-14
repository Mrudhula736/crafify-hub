package com.project.craftyHub.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomizeProduct
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private String productDescription;
    @ElementCollection
    private Map<String, String> specifications; // Map to store customizable specifications (e.g., color, size)
    private String imageUrl; // URL to the image of the customized product
    private boolean approved; // Indicates whether the request has been approved by the merchant
    private LocalDateTime requestDate;

    @OneToOne
    @JoinColumn(name="customer_id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name="merchant_id")
    private Merchant merchant;
}
