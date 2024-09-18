import {useState} from 'react';
import {Box, Paper, Slider, Typography} from '@mui/material';
import {PromptHeaderStyled} from './styled/PromptHeader.styled.tsx';
import {PrimaryButtonStyled} from './styled/PrimaryButton.styled.tsx';
import {SecondaryButtonStyled} from './styled/SecondaryButton.styled.tsx';

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
        <Box sx={{margin: 'auto', padding: 2, minWidth: 300, maxWidth: 500}}>
            <PromptHeaderStyled variant="h5" gutterBottom>
                How tall are you?
            </PromptHeaderStyled>
            <Paper elevation={3} sx={{padding: 4, borderRadius: 2}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography sx={{fontSize: 14, color: '#140A00', mb: 1}}>
                            250cm
                        </Typography>
                        <Slider
                            orientation="vertical"
                            value={height}
                            onChange={(_, newValue) => setHeight(newValue as number)}
                            min={90}
                            max={250}
                            sx={{
                                height: 180,
                                '& .MuiSlider-thumb': {
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#5C0A90',
                                },
                                '& .MuiSlider-rail': {
                                    width: 6,
                                    backgroundColor: '#C0CFDB',
                                },
                                '& .MuiSlider-track': {
                                    width: 6,
                                    backgroundColor: '#5C0A90',
                                },
                            }}
                        />
                        <Typography sx={{fontSize: 14, color: '#140A00', mt: 1}}>
                            90cm
                        </Typography>
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            ml: 5,
                            color: '#140A00',
                            width: '300px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        {height} cm
                    </Typography>
                </Box>
            </Paper>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
                <PrimaryButtonStyled onClick={handleSubmit}>CONTINUE</PrimaryButtonStyled>
                <SecondaryButtonStyled onClick={handleSkip}>SKIP FOR NOW</SecondaryButtonStyled>
            </Box>
        </Box>
    );
}