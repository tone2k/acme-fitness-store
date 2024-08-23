package com.example.acme.assist.model;

import lombok.Data;

import java.util.List;

/**
 * The product model from "catalog-service"
 */
@Data
public class Product {

    private String id;

    private String imageUrl1;

    private String imageUrl2;

    private String imageUrl3;

    private String name;

    private String shortDescription;

    private String description;

    private Double price;

    private List<String> tags;

}
