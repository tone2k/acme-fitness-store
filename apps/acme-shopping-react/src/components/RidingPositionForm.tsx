import { useState } from 'react';
import { Button, Box, InputLabel, Select, MenuItem, FormControl} from '@mui/material';

interface RidingPositionFormProps {
    onSubmit: (data: {ridingPosition: string }) => void;
}

export default function RidingPositionForm({ onSubmit }: RidingPositionFormProps) {

    const [ridingPosition, setRidingPosition] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ridingPosition});
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal" required size="small">
                <InputLabel>Preferred Riding Position</InputLabel>
                <Select
                    value={ridingPosition}
                    label="Preferred Riding Position"
                    onChange={(e) => setRidingPosition(e.target.value as string)}
                >
                    <MenuItem value="UPRIGHT AND RELAXED">Upright and Relaxed</MenuItem>
                    <MenuItem value="ACTIVE">Active</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
};