import {
    Container,
    Grid,
    Typography,
    Box
} from '@mui/material';

export default function OrderConfirmation() {
    return (
        <Container>
            <Box id="navbar" component="nav" sx={{ mb: 4 }}></Box>
            <Box mt={4} mb={4} textAlign="center">
                <Typography variant="h4">Order Info</Typography>
                <Typography variant="body1" id="orderMessage">Your transaction was successfully processed</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={9}>
                    <Typography variant="h5">Thank you for shopping with us :)</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
