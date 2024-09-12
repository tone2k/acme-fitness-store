import {useState} from 'react';
import {Box, Typography, Slider, Button, Paper} from '@mui/material';

interface HeightFormProps {
    onSubmit: (data: { height: string }) => void;
}

export default function HeightForm({onSubmit}: HeightFormProps) {
    const [height, setHeight] = useState(170);

    const handleSubmit = () => {
        onSubmit({height: height.toString()});
    };

    const handleSkip = () => {
        onSubmit({height: ''});
    };

    return (
        <>
            <Typography variant="h6" align="center" gutterBottom sx={{color: '#4B4B4B', fontWeight: 'bold', width: 400}}>
                How tall are you?
            </Typography>
            <Paper elevation={3} sx={{padding: 4, maxWidth: 400, margin: 'auto', borderRadius: 8}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{fontSize: 14, color: '#4B4B4B', mb: 1}}>250cm</Typography>
                        <Slider
                            orientation="vertical"
                            value={height}
                            onChange={(_, newValue) => setHeight(newValue as number)}
                            min={90}
                            max={250}
                            sx={{
                                height: 180,
                                '& .MuiSlider-thumb': {
                                    width: 20, // Thumb size
                                    height: 20,
                                    backgroundColor: '#003B70',
                                },
                                '& .MuiSlider-rail': {
                                    width: 6,
                                    backgroundColor: '#B3B3B3',
                                },
                                '& .MuiSlider-track': {
                                    width: 6,
                                    backgroundColor: '#003B70',
                                },
                            }}
                        />
                        <Typography sx={{fontSize: 14, color: '#4B4B4B', mt: 1}}>90cm</Typography>

                    </Box>
                    <Typography variant="h4" sx={{ml: 5, color: '#4B4B4B'}}>
                        {height} cm
                    </Typography>
                </Box>
            </Paper>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: '#003B70',
                        color: 'white',
                        '&:hover': {backgroundColor: '#005A8D'}
                    }}
                >
                    CONTINUE
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleSkip}
                    sx={{
                        borderColor: '#B3B3B3',
                        color: '#4B4B4B',
                        '&:hover': {backgroundColor: '#F5F5F5'}
                    }}
                >
                    SKIP FOR NOW
                </Button>
            </Box>
        </>
    );
}