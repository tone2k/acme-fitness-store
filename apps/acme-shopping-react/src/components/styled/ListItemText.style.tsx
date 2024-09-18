import {ListItemText, styled} from "@mui/material";

export const ListItemTextStyled = styled(ListItemText)(({theme}) => ({
    '& .MuiTypography-root': {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1em',
        fontWeight: 400,
        color: '#140A00',
        lineHeight: '140%',
    },
}));