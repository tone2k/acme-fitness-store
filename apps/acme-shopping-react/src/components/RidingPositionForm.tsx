import { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

const ridingPositions = [
    {
        name: 'Upright and relaxed',
        description: 'Great for comfortable riding on paved roads',
        image: '/upright.png',
        recommended: true
    },
    {
        name: 'Active',
        description: 'Take more control on fun or fitness rides',
        image: '/active.png'
    }
];

interface RidingPositionFormProps {
    onSubmit: (data: { ridingPosition: string }) => void;
}

export default function RidingPositionForm({ onSubmit }: RidingPositionFormProps) {
    const [selectedPosition, setSelectedPosition] = useState('');

    const handlePositionSelect = (position: string) => {
        setSelectedPosition(position);
        onSubmit({ ridingPosition: position });
    };

    const handleNotSure = () => {
        setSelectedPosition('');
        onSubmit({ ridingPosition: '' });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, borderRadius: 4 }}>
            <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
                Select a riding position
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                {ridingPositions.map((position) => (
                    <Card
                        key={position.name}
                        sx={{
                            width: '48%',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            border: selectedPosition === position.name ? '2px solid blue' : 'none',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                        onClick={() => handlePositionSelect(position.name)}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image={position.image}
                            alt={position.name}
                        />
                        <CardContent sx={{ flexGrow: 1, backgroundColor: 'white' }}>
                            <Typography gutterBottom variant="h6" component="div">
                                {position.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {position.description}
                            </Typography>
                            {position && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1, borderRadius: 4, textTransform: 'none' }}
                                >
                                    Recommended
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="outlined"
                    onClick={handleNotSure}
                    sx={{
                        borderColor: '#ccc',
                        color: '#666',
                        '&:hover': { borderColor: '#999', backgroundColor: '#f5f5f5' }
                    }}
                >
                    I'M NOT SURE
                </Button>
            </Box>
        </Box>
    );
}
