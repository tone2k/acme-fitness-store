import {Box, Divider, Grid, Stack, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import SellIcon from '@mui/icons-material/Sell';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CatalogCarousel from "./CatalogCarousel.tsx";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@mui/material/Container";

export default function Home() {

    const info = [
        {text1: "Satisfied", text2: "Customers", image: <FavoriteIcon fontSize='large'/>},
        {text1: "Best", text2: "Prices", image: <SellIcon fontSize='large'/>},
        {text1: "Next Day", text2: "Delivery", image: <SendIcon fontSize='large'/>},
        {text1: "Free Returns", text2: "for 3 Months", image: <LoopIcon fontSize='large'/>},
    ]

    return (
        <Container maxWidth="xl">
            <Stack justifyContent='center' alignItems='center' spacing={5} marginBottom={4}>
                <CatalogCarousel/>
                <Divider sx={{width: "50%"}}></Divider>
                <Typography
                    variant='h5'
                    sx={{fontSize: '1.5rem', fontWeight: '1000', letterSpacing: '0.18rem'}}
                >
                    ABOUT ACME FITNESS
                </Typography>
                <Box sx={{paddingLeft: {xs: 2, sm: 4}, maxWidth: {xs: '350px', sm: '700px'}}}>
                    <Grid container direction='row' spacing={{xs: 2, sm: 10}} justifyContent='center' alignItems='center'>
                        {info.map((item, index) => (
                            <Grid item xs={6} sm={3} lg={3} key={`info-${index}`}>
                                <Stack direction='row' alignItems='center' spacing={3}>
                                    {item.image}
                                    <Stack>
                                        <Typography>{item.text1}</Typography>
                                        <Typography>{item.text2}</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Divider sx={{width: "50%"}}></Divider>
                <Divider sx={{width: "50%"}}></Divider>
                <Button
                    color='inherit'
                    key='catalog'
                    component={RouterLink}
                    to='catalog'
                    sx={{fontSize: '1.5rem', fontWeight: '1000', letterSpacing: '0.18rem'}}
                >
                    New Arrivals
                </Button>
                <span>
                        <Typography display="inline">Free shipping </Typography>
                        <Typography display="inline" sx={{color: 'secondary.contrastText'}}>on all</Typography>
                    </span>
                <Stack alignItems='center' sx={{backgroundColor: 'transparent', textAlign: 'center'}} spacing={2}>
                    <TravelExploreIcon fontSize='large'/>
                    <Typography>Do you want to explore more?</Typography>
                    <Typography>We keep updating our inventory with exciting new products !!</Typography>
                    <Button variant='outlined' color='inherit' component={RouterLink} to='catalog'>Find More in Catalog</Button>
                </Stack>
            </Stack>
        </Container>
    );
}
