import {Box, styled} from "@mui/material";

export const RecommendedStyled = styled(Box)(({theme}) => ({
    backgroundColor: '#ffe900',
    color: '#000000',
    borderRadius: '20px',
    height: '35px',
    fontSize: '12px',
    fontStyle: 'italic',
    fontWeight: 'bold',
    boxShadow: "5px 5px 1px rgba(0, 0, 0, 1)",
    padding: '10px 20px',
    display: 'inline-block',
    textAlign: 'center',
}));