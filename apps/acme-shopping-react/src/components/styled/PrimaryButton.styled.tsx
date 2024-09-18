import {Button, styled} from "@mui/material";

export const PrimaryButtonStyled = styled(Button)(({theme}) => ({
    backgroundColor: '#5C0A90',
    color: '#FFFFFF',
    borderRadius: '4px',
    '&:hover': {
        backgroundColor: '#712C9C',
    },
}));