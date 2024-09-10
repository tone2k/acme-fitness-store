package com.example.acme.assist.config;

import com.example.acme.assist.CartService;
import com.example.acme.assist.model.CartAddRequest;
import com.example.acme.assist.model.CartAddResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.function.Function;

@Configuration
class FunctionConfig {

    @Bean
    public Function<CartAddRequest, CartAddResponse> addToCartFunction(CartService cartService) {
        return request -> cartService.addItemToCart(request.getUserId(), request.getItemId(), request.getQuantity(), request.getName(), request.getPrice(), request.getShortDescription());
    }
}
