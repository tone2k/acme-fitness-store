import { useState } from 'react';
import {Button, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';

interface TerrainFormProps {
    onSubmit: (data: { terrain: string }) => void;
}

export default function TerrainForm({ onSubmit }: TerrainFormProps) {
    const [terrain, setTerrain] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ terrain });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal" required size="small">
                <InputLabel>Preferred Terrain</InputLabel>
                <Select
                    value={terrain}
                    label="Preferred Terrain"
                    onChange={(e) => setTerrain(e.target.value as string)}
                >
                    <MenuItem value="PAVED PATHS">Paved Paths</MenuItem>
                    <MenuItem value="GRAVEL ROADS">Gravel Roads</MenuItem>
                    <MenuItem value="TRAILS">Trails</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
};

