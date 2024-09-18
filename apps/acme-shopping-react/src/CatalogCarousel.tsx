import Slider from 'react-slick';
import Container from "@mui/material/Container";
import {useGetProducts} from './hooks/catalogHooks';
import {Link, Typography, useMediaQuery, useTheme} from "@mui/material";

export default function CatalogCarousel() {
    const {data, isLoading, error} = useGetProducts();

    const theme = useTheme();
    const showMultipleImages = useMediaQuery(theme.breakpoints.up('md'));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: Failed to load products</div>;
    }

    const products = data.data

    if (!products || products.length < 1) {
        return <div>No products available</div>;
    }

    const first15Products = products.slice(0, 15);

    return (
        <Container sx={{py: 2}}>
            <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={showMultipleImages ? 3 : 1}
                slidesToScroll={1}
            >
                {first15Products.map((product) => (
                    <Link href={`/product/${product.id}`} sx={{textDecoration: 'none'}} key={product.id}>
                        <img src={product.imageUrl1} alt={product.name} style={{width: "100%"}}/>
                        <Typography sx={{textAlign: "center", py: 5}}>{product.name}</Typography>
                    </Link>
                ))}
            </Slider>
        </Container>
    );
}
