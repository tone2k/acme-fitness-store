import {Chip, styled} from "@mui/material";

export const InStockBadgeStyled = styled(Chip)(({theme}) => ({
    backgroundColor: '#7ce1b2',
    color: '#000000',
    border: '2px solid black',
    borderRadius: '20px',
    fontStyle: 'italic',
    height: '35px',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '6px 3px',
    display: 'inline-block',
    textAlign: 'center',
}));