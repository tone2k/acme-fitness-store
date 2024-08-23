package com.example.acme.assist.model;

import lombok.Data;

import java.util.List;

@Data
public class CatalogProductListResponse {

    private List<Product> data;

}
