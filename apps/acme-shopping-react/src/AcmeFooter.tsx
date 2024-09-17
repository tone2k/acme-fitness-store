import {Box, createTheme, Divider, Grid, Stack, TextField, ThemeProvider, Typography} from "@mui/material";
import Payment from './assets/payment.png';
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import Container from "@mui/material/Container";

interface AcmeFooterProps {
    handleLogin: () => void;
}

const footerTheme = createTheme({
    typography: {
        h6: {
            fontFamily: [
                "Montserrat",
                "Helvetica",
                "Arial",
                'sans-serif',
            ].join(','),
            fontSize: '1.1rem',
            fontWeight: '700',
        },
        body2: {
            color: "#CCCCCC",
            fontSize: '0.9rem',
            fontWeight: '550'
        },
        allVariants: {
            color: "#000000",
            fontFamily: [
                'Merriweather', 'serif'
            ].join(',')
        },
    },
});

export default function AcmeFooter({handleLogin}: AcmeFooterProps) {

    const address = {
        name: "ACME Fitness",
        address: "2705 Thunder Road",
        city: "Palo Alto",
        state: "California",
        country: "USA"
    }

    return (
        <ThemeProvider theme={footerTheme}>
            <Stack sx={{backgroundColor: '#f6f8f9'}}>
                <Container maxWidth="xl">
                    <Grid container direction='row' sx={{marginY: 6}}>
                        <Grid item xs={12} sm={6} md={4} paddingX={{xs: 0, sm: 2}}>
                            <Typography variant='h6' marginBottom={1}>Pages</Typography>
                            <Typography>About us</Typography>
                            <Typography>Terms and Conditions</Typography>
                            <Typography>FAQ</Typography>
                            <Typography>Contact us</Typography>
                            <Divider sx={{width: "100%", marginY: 2}} />
                            <Typography variant='h6' marginBottom={1}>User section</Typography>
                            <Typography>
                                <Button onClick={handleLogin} color='secondary'>
                                    Login
                                </Button>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} paddingX={{xs: 0, sm: 2}}>
                            <Divider sx={{width: "100%", marginY: 2, display: {xs: 'flex', sm: 'none'}}} />
                            <Typography variant='h6' marginBottom={1}>Where to find us</Typography>
                            <Typography>{address.name}</Typography>
                            <Typography>{address.address}</Typography>
                            <Typography>{address.city}</Typography>
                            <Typography>{address.state}</Typography>
                            <Typography>{address.country}</Typography>
                            <Button color='secondary' component={RouterLink} to='contact'>Go to contact page</Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} paddingX={{xs: 0, sm: 2}}>
                            <Divider sx={{width: "100%", marginY: 2, display: {xs: 'flex', md: 'none'}}} />
                            <Typography variant='h6' marginBottom={1}>Get the news</Typography>
                            <Typography>What's new in the world of Fitness</Typography>
                            <TextField InputProps={{
                                endAdornment: <SendIcon/>
                            }}></TextField>
                            <Divider sx={{width: "100%", my: "1rem"}}/>
                            <Typography>Stay in touch</Typography>
                            <Stack direction="row" spacing={2}>
                                <FacebookIcon/>
                                <XIcon/>
                                <InstagramIcon/>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>

                <Box sx={{background: "#333", paddingY: 4}}>
                    <Container maxWidth="xl">
                        <Grid container direction='row' paddingX={{xs: 0, sm: 2}}>
                            <Grid item xs={12} sm={6} sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                                <Typography variant="body2">© 2024 ACME Fitness</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{textAlign: {xs: 'center', sm: 'right'}}}>
                                <img src={Payment} alt="payment-options"/>
                            </Grid>
                            <Grid item xs={12} sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                                <Typography variant="body2">This website is for demo purposes only. It is not an actual e-commerce
                                    site.</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Stack>
        </ThemeProvider>
    );
}
