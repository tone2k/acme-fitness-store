package com.example.acme.catalog;

import io.micrometer.core.annotation.Timed;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Timed("store.products")
@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public GetProductsResponse getProducts(@RequestParam(required = false) String name) {
        // TODO: refactor this to remove the `data` attribute
        List<Product> products;
        if (name != null) {
            products = List.of(productService.getProductByName(name));
        } else {
            products = productService.getProducts();
        }
        return new GetProductsResponse(products.stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList()));
    }

    @GetMapping("/products/{id}")
    public GetProductResponse getProduct(@PathVariable String id) {
        return new GetProductResponse(new ProductResponse(productService.getProduct(id)), HttpStatus.OK.value());
    }

    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductResponse productVO) {
        Product product = productService.createProduct(Product.fromProductRequestToProduct(productVO));
        return ResponseEntity.ok(new ProductResponse(product));
    }

    @PostMapping("/products/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable String id, @RequestBody ProductResponse productVO) {
        Product product = productService.updateProduct(id, Product.fromProductRequestToProduct(productVO));
        return ResponseEntity.ok(new ProductResponse(product));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
