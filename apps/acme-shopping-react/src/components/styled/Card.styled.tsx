import {Card, styled} from "@mui/material";

export const CardStyled = styled(Card)(({ theme }) => ({
    background: '#FFFFFF',
    border: '1px solid #C0CFDB',
    boxShadow: '0px 1px 3px 0px rgba(27, 43, 50, 0.20)',
    '&:hover': {
        boxShadow: '0px 1px 10px 0px rgba(27, 43, 50, 0.40)',
    },
}));