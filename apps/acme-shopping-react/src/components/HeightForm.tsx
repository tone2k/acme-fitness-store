import { useState } from 'react';
import {Button, Box, Typography, TextField} from '@mui/material';
import Slider from "react-slick";

interface HeightFormProps {
    onSubmit: (data: { height: string }) => void;
}

export default function HeightForm({ onSubmit }: HeightFormProps) {
    const [height, setHeight] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ height });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography gutterBottom>Height (cm)</Typography>
            {/*<Slider*/}
            {/*    value={height}*/}
            {/*    onChange={(_, newValue) => setHeight(newValue as string)}*/}
            {/*    min={90}*/}
            {/*    max={250}*/}
            {/*    step={1}*/}
            {/*    marks*/}
            {/*    valueLabelDisplay="auto"*/}
            {/*/>*/}
            <TextField
                fullWidth
                label="Height (in cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                margin="normal"
                required
                type="number"
                size="small"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
};