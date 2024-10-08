import {MouseEvent as ReactMouseEvent} from "react"
import {Box, Breadcrumbs, Button, Container, Grid, Paper, Stack, TextField, Typography} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from "react-router-dom";

const handleClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    alert("Not Implemented")
}

export default function Home() {
    return (
        <Container sx={{mt: 2}}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link to="/" color="inherit">
                    Home
                </Link>
                <Typography color="text.primary">Contact</Typography>
            </Breadcrumbs>

            <Paper sx={{textAlign: 'center', p: 3, mt: 3}}>
                <Typography variant="h4">Contact</Typography>
                <Typography variant="body1" sx={{mt: 2}}>
                    Are you curious about something? Do you have some kind of problem with our products?
                    Please feel free to contact us, our customer service center is working for you 24/7.
                </Typography>
            </Paper>

            <Grid container spacing={3} sx={{mt: 3}}>
                <Grid item xs={12} md={4}>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <LocationOnIcon/>
                        <Typography variant="h6">
                            Address
                        </Typography>
                    </Stack>

                    <Typography variant="body2" color="textSecondary">
                        2705 Thunder Road <br/>
                        Palo Alto <br/>
                        94309 CA<br/>
                        United States
                    </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <PhoneIcon/>
                        <Typography variant="h6">
                            Call center
                        </Typography>
                    </Stack>

                    <Typography variant="body2" color="textSecondary">
                        This number is toll-free if calling from Great Britain, otherwise we advise you to use the
                        electronic form of communication.
                    </Typography>
                    <Typography variant="body2"><strong>+1-650-123-4567</strong></Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <EmailIcon/>
                        <Typography variant="h6">
                            Electronic support
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="textSecondary">
                        Please feel free to write an email to us or to use our electronic ticketing system.
                    </Typography>
                    <Typography variant="body2">
                        <strong>
                            <Link to="mailto:hello@beyondvirtual.io">hello@beyondvirtual.io</Link>
                        </strong>
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="h5" align="center" sx={{mt: 5}}>Contact form</Typography>

            <form>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="First name" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Last name" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Email" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Subject" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Message"
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Box textAlign="center" sx={{my: 3}}>
                    <Button onClick={(e) => handleClick(e)} variant="contained" color='inherit' type="submit">
                        Send message
                    </Button>
                </Box>
            </form>
        </Container>
    );
}
