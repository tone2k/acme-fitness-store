import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './assets/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {Box, Modal, Stack, Typography} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssistIcon from '@mui/icons-material/TipsAndUpdates';
import UserIcon from '@mui/icons-material/AccountCircle';
import {useGetCart} from './hooks/cartHooks.ts';
import {useGetUserInfo} from './hooks/userHooks';
import ChatModal from "./ChatModal.tsx";
import {useState} from "react";

const pages = [
    {name: 'Home', navigateTo: '/'},
    {name: 'Catalog', navigateTo: 'catalog'},
    {name: 'Contact', navigateTo: 'contact'}
];

interface AcmeAppBarProps {
    handleLogin: () => void;
    handleLogout: () => void;
}

export default function AcmeAppBar({handleLogin, handleLogout}: AcmeAppBarProps) {
    const navigate = useNavigate();
    const [chatOpen, setIsChatOpen] = useState(false);

    const [userModalOpen, setUserModalOpen] = useState(false);

    const {data: userInfo} = useGetUserInfo();

    const {data: cartData} = useGetCart(userInfo?.userId || '', userInfo);


    const itemsInCart = cartData?.cart?.reduce((total, item) => total + item.quantity, 0) || 0;

    const handleShoppingCartOpen = () => {
        navigate('/cart');
    }

    const handleChatOpen = () => {
        setIsChatOpen(true);
    }

    const handleChatClose = () => {
        setIsChatOpen(false);
    }
    const handleUserModalClose = () => {
        setUserModalOpen(false);
    }
    const handleLoginClick = () => {
        console.log(userInfo);
        if (userInfo && userInfo.userId) {
            setUserModalOpen(true);
        } else {
            handleLogin();
        }
    }

    return (
        <>
            <AppBar position="static" color="inherit">
                <Container maxWidth="xl">
                    <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={10}>
                        <Stack direction='row'>
                            <IconButton component={Link} to={'/'}>
                                <img src={Logo} alt="acme-logo"/>
                            </IconButton>
                            {pages.map((page) => (
                                <Button
                                    sx={{color: 'secondary.contrastText'}}
                                    key={page.name}
                                    component={Link}
                                    to={page.navigateTo}>
                                    {page.name}
                                </Button>
                            ))}
                        </Stack>
                        <Stack direction='row' alignContent='right' spacing={4}>
                            <IconButton data-cy="login-button" onClick={handleLoginClick} color='inherit'>
                                <UserIcon/>
                            </IconButton>
                            <Button
                                data-cy="cart-button"
                                variant='outlined'
                                color='inherit'
                                onClick={handleShoppingCartOpen}
                                startIcon={<ShoppingCartIcon/>}
                            >
                                {itemsInCart} items in Cart
                            </Button>
                            <Button  data-cy="assist-button" variant='outlined' color='inherit' onClick={handleChatOpen}
                                    startIcon={<AssistIcon/>}>Ask FitAssist</Button>
                        </Stack>
                    </Stack>
                </Container>
            </AppBar>
            <Modal
                open={userModalOpen}
                onClose={handleUserModalClose}
                aria-labelledby="user-info-modal"
                aria-describedby="user-info-and-logout"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography id="user-info-modal" variant="h6" component="h2">
                        User Information
                    </Typography>
                    <Typography id="user-info-username" sx={{ mt: 2 }}>
                        {`Hello, ${userInfo?.userName}`}
                    </Typography>
                    <Button id="user-info-logout" onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Logout
                    </Button>
                </Box>
            </Modal>
            <ChatModal open={chatOpen} onClose={handleChatClose} cartData={cartData} productId={null}/>
        </>
    );
}
