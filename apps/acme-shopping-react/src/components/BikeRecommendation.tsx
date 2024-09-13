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

export interface BikeRecommendationProps {
    productName: string,
    productId: string,
    productPrice: string,
    productImage: string,
    productDescription: string,
    recommendationText: string,
}

export default function BikeRecommendation(bikeRecommendationProps: BikeRecommendationProps) {
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
                image={bikeRecommendationProps.productImage}
                alt={bikeRecommendationProps.productName}
            />
            <Box sx={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <CardLabelStyled>
                        {bikeRecommendationProps.productName}
                    </CardLabelStyled>
                    <CardPriceStyled>
                        {bikeRecommendationProps.productPrice}
                    </CardPriceStyled>
                    <Box sx={{display: 'flex', gap: 1, mb: 2}}>
                        <NewBadgeStyled label="New" size="small"/>
                        <InStockBadgeStyled label="In Stock" size="small"/>
                    </Box>
                    <CardParagraphStyled variant="body1">
                        {bikeRecommendationProps.productDescription}
                    </CardParagraphStyled>
                    <PrimaryButtonStyled href={`/product/${bikeRecommendationProps.productId}`} variant="contained">
                        CHECK IT OUT
                    </PrimaryButtonStyled>
                </CardContent>
                <CardContent>
                    <InfoHeaderStyled>
                        <MagicIcon/>
                        Why is the {bikeRecommendationProps.productName} a great fit for me?
                    </InfoHeaderStyled>
                    <List dense>
                        {[
                            bikeRecommendationProps.recommendationText
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
