import {useState} from 'react';
import {Box, CardContent, CardMedia} from '@mui/material';
import {PromptHeaderStyled} from "./styled/PromptHeader.styled.tsx";
import {CardStyled} from "./styled/Card.styled.tsx";
import {CardParagraphStyled} from "./styled/CardParagraph.styled.tsx";
import {SecondaryButtonStyled} from "./styled/SecondaryButton.styled.tsx";
import {CardLabelStyled} from "./styled/CardLabel.styled.tsx";
import {RecommendedStyled} from "./styled/Recommended.styled.tsx";

const terrainOptions = [
    {
        name: 'Paved paths',
        description: 'Suburban and city roads, or established bike paths',
        image: '/paved.png',
        recommended: true,
    },
    {
        name: 'Gravel roads',
        description: 'More agility for gravel trails and roads',
        image: '/gravel.png',
    },
    {
        name: 'Trails',
        description: 'Added stability for mountain biking, trails, jumps, and off-roading',
        image: '/trail.png',
    },
];

interface TerrainFormProps {
    onSubmit: (data: { terrain: string }) => void;
}

export default function TerrainForm({onSubmit}: TerrainFormProps) {
    const [selectedTerrain, setSelectedTerrain] = useState('');

    const handleTerrainSelect = (terrain: string) => {
        setSelectedTerrain(terrain);
        onSubmit({terrain});
    };

    const handleNotSure = () => {
        setSelectedTerrain('');
        onSubmit({terrain: ''});
    };

    return (
        <Box sx={{margin: 'auto', padding: 2, maxWidth: 600}}>
            <PromptHeaderStyled variant="h5" gutterBottom>
                Select a terrain
            </PromptHeaderStyled>
            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
                {terrainOptions.map((option) => (
                    <CardStyled
                        key={option.name}
                        sx={{
                            width: '32%',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            border: selectedTerrain === option.name ? '2px solid #5C0A90' : undefined,
                        }}
                        onClick={() => handleTerrainSelect(option.name)}
                    >
                        <CardMedia component="img" height="140" image={option.image} alt={option.name}/>
                        <CardContent sx={{flexGrow: 1}}>
                            <CardLabelStyled gutterBottom variant="h6">
                                {option.name}
                            </CardLabelStyled>
                            <CardParagraphStyled variant="body2">
                                {option.description}
                            </CardParagraphStyled>
                            {option?.recommended && (
                                <RecommendedStyled
                                    sx={{mt: 1, textTransform: 'none'}}
                                >
                                    Recommended
                                </RecommendedStyled>
                            )}
                        </CardContent>
                    </CardStyled>
                ))}
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                <SecondaryButtonStyled onClick={handleNotSure}>I'M NOT SURE</SecondaryButtonStyled>
            </Box>
        </Box>
    );
}