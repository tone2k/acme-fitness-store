import {styled, Typography} from "@mui/material";

export const PromptHeaderStyled = styled(Typography)(({theme}) => ({
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.25em',
    fontWeight: 600,
    color: '#140A00',
    lineHeight: '140%',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
}));