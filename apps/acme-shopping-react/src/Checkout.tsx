import {ChangeEvent, useState} from 'react';
import {Container, Grid, Box, Typography, Breadcrumbs, Link} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import AddressForm from "./AddressForm.tsx";
import OrderSummary from "./OrderSummary.tsx";
import {useGetUserInfo} from './hooks/userHooks';
import {AddressData} from "./types/Address.ts";

export default function Checkout() {
    const {data: userInfo} = useGetUserInfo();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {cartItems = [], total = 0} = state || {};

    const [addressData, setAddressData] = useState<AddressData>({
        firstname: '',
        lastname: '',
        company: '',
        street: '',
        city: '',
        zip: '',
        state: 'CA',
        country: 'USA',
        phone: '',
        email: '',
    });

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setAddressData((prevData) => ({...prevData, [target.name]: target.value}));
    };

    const handleSubmit = () => {
        navigate("/delivery", {state: {cartItems, total, addressData}});
    };

    return (
        <Container sx={{mt: 8}}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link underline="hover" color="inherit" href="/cart">
                    Cart
                </Link>
                <Typography color="text.primary">Address</Typography>
            </Breadcrumbs>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <Box mt={5}>
                        <Typography variant='h3' align="center">
                            Checkout - Address
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <AddressForm formData={addressData} handleChange={handleChange} handleSubmit={handleSubmit}/>
                    </Box>
                </Grid>
                <OrderSummary userInfo={userInfo}/>
            </Grid>
        </Container>
    );
}
