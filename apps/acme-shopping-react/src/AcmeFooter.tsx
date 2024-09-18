import {createTheme, Divider, Grid, Link, Stack, TextField, ThemeProvider, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import Container from "@mui/material/Container";

const footerTheme = createTheme({
    typography: {
        h6: {
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
                "Montserrat",
                "Helvetica",
                "Arial",
                'sans-serif',
            ].join(','),
        },
    },
});

export default function AcmeFooter() {

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
                            <Stack>
                                <Typography variant='h6' marginBottom={1}>Pages</Typography>

                                {/*TODO: fix these links that don't go anywhere*/}
                                <Link href="/" underline="hover" sx={{color: "black"}}>About us</Link>
                                <Link href="/" underline="hover" sx={{color: "black"}}>Terms and Conditions</Link>
                                <Link href="/" underline="hover" sx={{color: "black"}}>FAQ</Link>
                                <Link href="/contact" underline="hover" sx={{color: "black"}}>Contact us</Link>
                            </Stack>

                            <Divider sx={{width: "100%", marginY: 2}}/>

                            <Typography variant='h6' marginBottom={1}>User</Typography>
                            <Link href="/acme-login" underline="hover" sx={{color: "black"}}>Login</Link>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} paddingX={{xs: 0, sm: 2}}>
                            <Divider sx={{width: "100%", marginY: 2, display: {xs: 'flex', sm: 'none'}}}/>
                            <Typography variant='h6' marginBottom={1}>Where to find us</Typography>
                            <Typography>{address.name}</Typography>
                            <Typography>{address.address}</Typography>
                            <Typography>{`${address.city}, ${address.state}`}</Typography>
                            <Typography>{address.country}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} paddingX={{xs: 0, sm: 2}}>
                            <Divider sx={{width: 1, marginY: 2, display: {xs: 'flex', md: 'none'}}}/>

                            <Typography variant='h6' sx={{mb: 1}}>Get the news</Typography>
                            <Typography sx={{mb: 2}}>What's new in the world of Fitness</Typography>
                            <TextField sx={{width: '100%'}} size='small' placeholder="Enter your email."
                                       InputProps={{endAdornment: <SendIcon/>}}/>

                            <Divider sx={{width: "100%", my: 2}}/>

                            <Typography variant='h6' sx={{mt: 3, mb: 2}}>Stay in touch</Typography>
                            <Stack direction="row" spacing={2}>
                                <FacebookIcon/>
                                <XIcon/>
                                <InstagramIcon/>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>

                <Stack direction={{xs: 'column', md: 'row'}} alignItems='center' justifyContent="space-between" sx={{background: "#333", p: 4 }}>
                    <span>
                        <Typography variant="body2">{`© ${new Date().getFullYear()} ACME Fitness`}</Typography>
                        <Typography variant="body2" sx={{fontStyle: 'italic'}}>
                            This website is for demo purposes only. It is not an actual e-commerce site.
                        </Typography>
                    </span>

                    <Stack direction='row' justifyContent='end' alignItems='center' gap={1} sx={{ mt: {xs: 4, md: 0 } }}>
                        <img src="/payment/visa.png" width={50} alt="visa"/>
                        <img src="/payment/discover.png" width={50} alt="discover"/>
                        <img src="/payment/mastercard.png" width={50} alt="mastercard"/>
                        <img src="/payment/american-express.png" width={50} alt="american-express"/>
                        <img src="/payment/paypal.png" width={50} alt="paypal"/>
                    </Stack>


                </Stack>
            </Stack>
        </ThemeProvider>
    );
}
