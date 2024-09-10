package com.example.acme.assist.model;

import lombok.Data;

@Data
public class CartAddRequest {
    private String userId;
    private String itemId;
    private int quantity;
    private String name;
    private String price;
    private String shortDescription;
}