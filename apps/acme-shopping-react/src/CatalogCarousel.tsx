import React from "react";
import Slider from 'react-slick';
import Container from "@mui/material/Container";
import { useGetProducts } from './hooks/catalogHooks'; 
import { Link } from "react-router-dom";

export default function CatalogCarousel() {
    const getProductsResponse = useGetProducts();

    const settings = {
        dots: true,
        infinite: false, 
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    if (getProductsResponse['response'].isLoading) {
        return <div>Loading...</div>;
    }

    if (getProductsResponse['response'].error) {
        return <div>Error: Failed to load products</div>;
    }

    if (!getProductsResponse['response'].data || getProductsResponse['response'].data.length === 0) {
        return <div>No products available</div>;
    }

    const products = getProductsResponse['response'].data.data.slice(0, 15); 

    return (
        <Container sx={{ py: "10px" }}>
        <Slider {...settings}>
            {products.map((product) => (
                <div key={product.id}>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                        <img src={product.imageUrl1} alt={product.name} style={{ width: "100%" }} />
                        <p style={{ textAlign: "center", marginTop: "10px", color: 'inherit' }}>{product.name}</p>
                    </Link>
                </div>
            ))}
        </Slider>
    </Container>
    );
}