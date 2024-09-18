import {Box, CardContent, CardMedia, List, ListItem,} from '@mui/material';
import {PrimaryButtonStyled} from "./styled/PrimaryButton.styled.tsx";
import {CardStyled} from "./styled/Card.styled.tsx";
import {CardLabelStyled} from "./styled/CardLabel.styled.tsx";
import {CardParagraphStyled} from "./styled/CardParagraph.styled.tsx";
import {CardPriceStyled} from "./styled/CardPrice.styled.tsx";
import {InfoHeaderStyled} from "./styled/InfoHeader.styled.tsx";
import {ListItemTextStyled} from "./styled/ListItemText.style.tsx";
import MagicIcon from "./MagicIcon.tsx";
import {NewBadgeStyled} from "./styled/NewBadge.styled.tsx";
import {InStockBadgeStyled} from "./styled/InStockBadge.styled.tsx";


export default function FakeRecommendation() {
    return (
        <CardStyled sx={{
            maxWidth: 800,
            margin: 'auto',
            display: 'flex',
            borderRadius: '4px',
            overflow: 'hidden'
        }}>
            <CardMedia
                component="img"
                sx={{width: '50%', height: '100%', objectFit: 'cover'}}
                image="/bike.png"
                alt="Velocity V9 Bike"
            />
            <Box sx={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <CardLabelStyled>
                        Velocity V9
                    </CardLabelStyled>
                    <CardPriceStyled>
                        $2,199.99
                    </CardPriceStyled>
                    <Box sx={{display: 'flex', gap: 1, mb: 2}}>
                        <NewBadgeStyled label="New" size="small"/>
                        <InStockBadgeStyled label="In Stock" size="small"/>
                    </Box>
                    <CardParagraphStyled variant="body1">
                        Velocity V9 is a high-performance hybrid bike that combines speed and comfort for riders who
                        demand the best of both worlds.
                    </CardParagraphStyled>
                    <PrimaryButtonStyled href="/product/7283caf9-a24f-44ea-baba-a9ee64f86b54" variant="contained">
                        CHECK IT OUT
                    </PrimaryButtonStyled>
                </CardContent>
                <CardContent>
                    <InfoHeaderStyled>
                        <MagicIcon/>
                        Why is the Velocity V9 a great fit for me?
                    </InfoHeaderStyled>
                    <List dense>
                        {[
                            'Lightweight frame and 700c wheels with high-quality tires make it a great fit for paved roads and gravel alike.',
                            'Upright posture is ideal for a comfortable ride.',
                            'Tires and frame work well for a 170cm tall rider.',
                        ].map((text, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemTextStyled primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Box>
        </CardStyled>
    );
}