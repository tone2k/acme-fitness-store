import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

export default function FakeBikeRecommendation() {
    return (
        <Card sx={{ maxWidth: 1244, margin: 'auto', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
            <CardMedia
                component="img"
                sx={{ width: 400}}
                image="/bike.png"
                alt="Velocity V9 Bike"
            />
            <CardContent>
                <Box>
                    <Typography variant="h6" color="text.primary">
                        Velocity V9
                    </Typography>
                    <Typography variant="h5" color="secondary" sx={{ mb: 2 }}>
                        $2,199.99
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Velocity V9 is a high-performance hybrid bike that combines speed and comfort for riders who demand the best of both worlds.
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        CHECK IT OUT
                    </Button>
                </Box>
            </CardContent>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>
                        Why is the Velocity V9 a great fit for me?
                    </Typography>
                    <Typography variant="body4" color="text.secondary">
                        <ul>
                            <li>Lightweight frame and 700c wheels with high-quality tires make it a great fit for paved roads and gravel alike.</li>
                            <li>Upright posture is ideal for a comfortable ride.</li>
                            <li>Tires and frame work well for a 170cm tall rider.</li>
                        </ul>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
