package com.example.acme.catalog;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, String> {
    Optional<Product> findByName(String name); //TODO remove unneeded
}
