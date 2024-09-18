import {Button, styled} from "@mui/material";

export const SecondaryButtonStyled = styled(Button)(({theme}) => ({
    color: '#1B2636',
    border: '1px solid #1B2636',
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        border: '2px solid #1B2636',
    },
}));