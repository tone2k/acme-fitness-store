import {Chip, styled} from "@mui/material";

export const NewBadgeStyled = styled(Chip)(({theme}) => ({
    backgroundColor: '#ffe900',
    color: '#000000',
    border: '2px solid black',
    borderRadius: '20px',
    height: '35px',
    fontStyle: 'italic',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '6px 3px',
    display: 'inline-block',
    textAlign: 'center',
}));