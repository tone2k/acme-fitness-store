import {useState} from 'react';
import {Box, CardContent, CardMedia} from '@mui/material';
import {PromptHeaderStyled} from "./styled/PromptHeader.styled.tsx";
import {CardStyled} from "./styled/Card.styled.tsx";
import {CardLabelStyled} from "./styled/CardLabel.styled.tsx";
import {CardParagraphStyled} from "./styled/CardParagraph.styled.tsx";
import {SecondaryButtonStyled} from "./styled/SecondaryButton.styled.tsx";
import {RecommendedStyled} from "./styled/Recommended.styled.tsx";

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

export default function RidingPositionForm({onSubmit}: RidingPositionFormProps) {
    const [selectedPosition, setSelectedPosition] = useState('');

    const handlePositionSelect = (position: string) => {
        setSelectedPosition(position);
        onSubmit({ridingPosition: position});
    };

    const handleNotSure = () => {
        setSelectedPosition('');
        onSubmit({ridingPosition: ''});
    };

    return (
        <Box sx={{maxWidth: 600, margin: 'auto', padding: 2}}>
            <PromptHeaderStyled variant="h5" gutterBottom>
                Select a riding position
            </PromptHeaderStyled>
            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2}}>
                {ridingPositions.map((position) => (
                    <CardStyled
                        key={position.name}
                        sx={{
                            width: '48%',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            border: selectedPosition === position.name ? '2px solid #5C0A90' : undefined,
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
                        <CardContent sx={{flexGrow: 1}}>
                            <CardLabelStyled gutterBottom variant="h6">
                                {position.name}
                            </CardLabelStyled>
                            <CardParagraphStyled variant="body2" color="text.secondary">
                                {position.description}
                            </CardParagraphStyled>
                            {position?.recommended && (
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
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <SecondaryButtonStyled onClick={handleNotSure}>
                    I'M NOT SURE
                </SecondaryButtonStyled>
            </Box>
        </Box>
    );
}