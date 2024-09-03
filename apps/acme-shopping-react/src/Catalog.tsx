import {Breadcrumbs, Card, CardActionArea, Container, Grid, Link, Stack, Typography} from "@mui/material";
import {useGetProducts} from './hooks/catalogHooks';
import {Link as RouterLink} from "react-router-dom";

export default function Catalog() {
    const { data, isLoading, error} = useGetProducts();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const products = data.data

    if (!products || products.length < 1) {
        return <div>No products available</div>;
    }

    return (
        <Container sx={{mt: 2}}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Typography color="text.primary">Catalog</Typography>
            </Breadcrumbs>
            <Stack alignItems='center'>
                <h2>Products</h2>
                <h5>Best in Class Products to keep you fit</h5>

                <Grid container spacing={3} sx={{width: "75%"}}>
                    {products.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card key={index}>
                                <CardActionArea sx={{height: "300px", p: "20px"}} component={RouterLink}
                                                to={`/product/${item.id}`}>
                                    <Stack alignItems='center' spacing={2}>
                                        <img src={item.imageUrl1} width="160px" alt={`image-${item.name}`}/>
                                        <Typography align='center'>{item.name}</Typography>
                                        <Typography>{`USD ${item.price}`}</Typography>
                                    </Stack>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
}
