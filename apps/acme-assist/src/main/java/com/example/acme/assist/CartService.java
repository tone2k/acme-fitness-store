package com.example.acme.assist;

import com.example.acme.assist.model.CartAddRequest;
import com.example.acme.assist.model.CartAddResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CartService {

    private final RestTemplate restTemplate;

    public CartService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public CartAddResponse addItemToCart(String userId, String itemId, int quantity, String name, String price, String shortDescription) {
        String url = "http://localhost:8090/cart/item/add/" + userId;

        CartAddRequest request = new CartAddRequest();
        request.setUserId(userId);
        request.setItemId(itemId);
        request.setQuantity(quantity);
        request.setName(name);
        request.setPrice(price);
        request.setShortDescription(shortDescription);

        CartAddResponse response = restTemplate.postForObject(url, request, CartAddResponse.class);

        if (response == null) {
            response = new CartAddResponse();
            response.setUserId(userId);
            response.setStatus("Failed to add item to cart.");
        } else {
            response.setStatus("Item added to cart successfully.");
        }

        return response;
    }
}
