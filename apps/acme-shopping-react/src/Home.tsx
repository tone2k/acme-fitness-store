import {Divider, Stack, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import SellIcon from '@mui/icons-material/Sell';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CatalogCarousel from "./CatalogCarousel.tsx";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {

    const info = [
        {text: "Satisfied Customers", image: <FavoriteIcon fontSize='large'/>},
        {text: "Best Prices", image: <SellIcon fontSize='large'/>},
        {text: "Next Day Delivery", image: <SendIcon fontSize='large'/>},
        {text: "Free Returns for 3 Months", image: <LoopIcon fontSize='large'/>},
    ]

    return (
        <Stack
            justifyContent='center'
            alignItems='center'
            spacing={5}
            marginBottom={4}
            sx={{mx: {xs: 3, sm: 25}}}
        >
            <CatalogCarousel/>

            <Divider sx={{width: "50%"}}></Divider>

            <Stack alignItems='center'>
                <Typography
                    variant='h5'
                    sx={{my: 2, fontWeight: '1000', letterSpacing: '0.18rem', textAlign: 'center'}}
                >
                    ABOUT ACME FITNESS
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='center' alignItems='center' gap={2}>
                    {info.map((item) => (
                        <Stack direction='row' alignItems='center' spacing={3} sx={{ width: 1 }}>
                            {item.image}
                            <Typography sx={{ flexGrow: 1 }}>{item.text}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>


            <Divider sx={{width: "50%"}}/>

            <Button
                color='inherit'
                key='catalog'
                component={Link}
                to='catalog'
                sx={{fontSize: '1.5rem', fontWeight: '1000', letterSpacing: '0.18rem'}}
            >
                New Arrivals
            </Button>

            <Typography>Free shipping on all</Typography>

            <Stack alignItems='center' sx={{backgroundColor: 'transparent', textAlign: 'center'}} spacing={2}>
                <TravelExploreIcon fontSize='large'/>
                <Typography>Do you want to explore more?</Typography>
                <Typography>We keep updating our inventory with exciting new products !!</Typography>
                <Button variant='outlined' color='inherit' component={Link} to='catalog'>
                    Find More in Catalog
                </Button>
            </Stack>
        </Stack>
    );
}
