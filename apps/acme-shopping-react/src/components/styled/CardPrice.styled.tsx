import {styled, Typography} from "@mui/material";

export const CardPriceStyled = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto, sans-serif',
    fontSize: '2em',
    fontWeight: 400,
    color: '#140A00',
    lineHeight: '150%',
    marginBottom: theme.spacing(1),
}));
