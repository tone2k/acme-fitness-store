import {styled, Typography} from "@mui/material";

export const InfoHeaderStyled = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto, sans-serif',
    paddingLeft: '.25em',
    fontWeight: 600,
    color: '#140A00',
    lineHeight: '140%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
}));