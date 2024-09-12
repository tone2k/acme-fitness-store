import { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

const terrainOptions = [
    {
        name: 'Paved paths',
        description: 'Suburban and city roads, or established bike paths',
        image: '/public/paved.png',
        recommended: true
    },
    {
        name: 'Gravel roads',
        description: 'More agility for gravel trails and roads',
        image: '/public/gravel.png'
    },
    {
        name: 'Trails',
        description: 'Added stability for mountain biking, trails, jumps, and off-roading',
        image: '/public/trail.png'
    }
];

interface TerrainFormProps {
    onSubmit: (data: { terrain: string }) => void;
}

export default function TerrainForm({ onSubmit }: TerrainFormProps) {
    const [selectedTerrain, setSelectedTerrain] = useState('');

    const handleTerrainSelect = (terrain: string) => {
        setSelectedTerrain(terrain);
        onSubmit({ terrain });
    };

    const handleNotSure = () => {
        setSelectedTerrain('');
        onSubmit({ terrain: '' });
    };

    return (
        <Box sx={{ margin: 'auto', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Select a terrain
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                {terrainOptions.map((option) => (
                    <Card
                        key={option.name}
                        sx={{
                            width: '32%',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            border: selectedTerrain === option.name ? '2px solid blue' : 'none'
                        }}
                        onClick={() => handleTerrainSelect(option.name)}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={option.image}
                            alt={option.name}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="div">
                                {option.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {option.description}
                            </Typography>
                            {option && (
                                <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                                    Recommended
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="outlined" onClick={handleNotSure}>
                    I'M NOT SURE
                </Button>
            </Box>
        </Box>
    );
}