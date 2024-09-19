import {useEffect, useRef, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import {Close, Refresh, Send} from '@mui/icons-material';
import {useChatService} from './hooks/useChatService';
import {summarizeCart} from "./utils/helpers";
import {CartData} from "./types/Cart";
import TerrainForm from './components/TerrainForm';
import RidingPositionForm from './components/RidingPositionForm';
import FakeBikeRecommendation from "./components/FakeRecommendation";
import {PromptHeaderStyled} from "./components/styled/PromptHeader.styled.tsx";
import {CardStyled} from "./components/styled/Card.styled.tsx";
import {PrimaryButtonStyled} from "./components/styled/PrimaryButton.styled.tsx";
import HeightForm from "./components/HeightForm.tsx";
import { useFitAssistSocket } from './hooks/useFitAssistSocket';
import {useGetUserInfo} from "./hooks/userHooks.ts";


interface ChatModalProps {
    open: boolean;
    onClose: () => void;
    productId: string | null;
    cartData: CartData;
}

export default function ChatModal({open, onClose, cartData}: ChatModalProps) {
    const [inputMessage, setInputMessage] = useState('');
    const [jiggle, setJiggle] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const {data: userInfo} = useGetUserInfo();
    const {
        chatHistory,
        sendMessage,
        refreshChat,
        isLoading,
        error,
        currentForm,
        submitForm,
        isCompletingForm,
        setIsFormCompleted,
        isFormCompleted
    } = useChatService();
    const closeButtonRef = useRef(null);
    const {
        socketChatHistory,
        client,
        isConnected,
        connect,
        disconnect,
        publishQuestion,
    } = useFitAssistSocket();

    useEffect(() => {
        if (open) {
            connect(userInfo.userId); //TODO need to fix how to pass this forward.
        } else {
            disconnect();
        }
    }, [open, userInfo]);

    useEffect(() => {
        if (isConnected) {
            console.log('Successfully connected to FitAssist WebSocket');
        }
    }, [isConnected]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const defaultWidth = {xs: '90vw', sm: '420px'};
    const defaultHeight = {xs: '90vh', sm: '600px'};

    const expandedWidth = {xs: '90vw', sm: '840px'};
    const expandedHeight = {xs: '90vh', sm: '1000px'};

    const handleClose = (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (reason !== 'backdropClick') {
            onClose();
        } else {
            handleBackdropClick();
        }
    };

    const handleSend = async (message: string) => {
        if (message.trim()) {
            setInputMessage('');
            publishQuestion(message, summarizeCart(cartData.cart));
            setInputMessage('');
        }
    };

    const handleBackdropClick = () => {
        setJiggle(true);
        if (closeButtonRef.current) {
            (closeButtonRef.current as HTMLElement).style.transform = 'scale(2.5)';
        }
        setTimeout(() => {
            setJiggle(false);
            if (closeButtonRef.current) {
                (closeButtonRef.current as HTMLElement).style.transform = 'scale(1)';
            }
        }, 500);
    };

    const renderMessageContent = (message: any) => {
        if (message.formType === 'FORM1') {
            return <TerrainForm onSubmit={(data) => submitForm('FORM1', data)}/>;
        } else if (message.formType === 'FORM2') {
            return <RidingPositionForm onSubmit={(data) => submitForm('FORM2', data)}/>;
        } else if (message.formType === 'FORM3') {
            return <HeightForm onSubmit={(data) => submitForm('FORM3', data)}/>
        } else if (message.formType === 'RECOMMENDATION') {
            return <FakeBikeRecommendation/>;
        } else {
            return <>{message.content}</>;
        }
    };

    useEffect(() => {
        if (isCompletingForm) {
            setIsExpanded(true);
        }
    }, [isCompletingForm]);

    useEffect(() => {
        if (!open) {
            setIsExpanded(false);
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            document.querySelectorAll('body > *:not(#chat-dialog)').forEach((element) => {
                element.setAttribute('inert', 'true');
            });
        } else {
            document.querySelectorAll('[inert]').forEach((element) => {
                element.removeAttribute('inert');
            });
        }

        return () => {
            document.querySelectorAll('[inert]').forEach((element) => {
                element.removeAttribute('inert');
            });
        };
    }, [open]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [socketChatHistory]);

    return (
        <Dialog
            open={open}
            maxWidth={false}
            onClose={handleClose}
            disableEnforceFocus
            hideBackdrop
            disableScrollLock
            PaperProps={{
                sx: {
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    m: 0,
                    width: isExpanded ? expandedWidth : defaultWidth,
                    height: isExpanded ? expandedHeight : defaultHeight,
                    pointerEvents: 'auto',
                    transition: 'width 0.3s, height 0.3s',
                },
            }}
        >
            <DialogTitle sx={{padding: '8px 16px', margin: 0}}>
                <PromptHeaderStyled>Chat with FitAssist</PromptHeaderStyled>
                <Typography
                    sx={{margin: '4px 0 0 0', fontSize: '0.8rem', lineHeight: 1, fontWeight: 'bold', color: 'green'}}>
                    Powered by SpringAI
                </Typography>
                <IconButton
                    data-cy="assist-close"
                    ref={closeButtonRef}
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        animation: jiggle ? 'jiggle 0.5s ease-in-out' : 'none',
                        transition: 'transform 0.2s',
                        '@keyframes jiggle': {
                            '0%': {transform: 'rotate(0deg)'},
                            '25%': {transform: 'rotate(-5deg) scale(2.5)'},
                            '50%': {transform: 'rotate(5deg) scale(2.5)'},
                            '75%': {transform: 'rotate(-5deg) scale(2.5)'},
                            '100%': {transform: 'rotate(0deg)'},
                        },
                    }}
                >
                    <Close/>
                </IconButton>
                <IconButton
                    data-cy="assist-clear"
                    aria-label="refresh"
                    onClick={refreshChat}
                    sx={{position: 'absolute', right: 48, top: 8}}
                >
                    <Refresh/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{p: 1}}>
                <List sx={{
                    height: isExpanded ? 'calc(100% - 64px)' : '450px',
                    overflow: 'auto',
                    transition: 'height 0.3s',
                }}>
                    {socketChatHistory.map((message, index) => (
                        <ListItem
                            id={`assist-message-${index}`}
                            key={index}
                            sx={{
                                justifyContent: message.role === 'USER' ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <CardStyled
                                elevation={2}
                                sx={{
                                    p: 1,
                                    backgroundColor: message.role === 'USER' ? '#5C0A90' : '#F5F5F5',
                                    borderRadius: message.role === 'USER' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                }}
                            >
                                <ListItemText
                                    primary={renderMessageContent(message)}
                                    sx={{
                                        wordBreak: 'break-word',
                                        '& .MuiListItemText-primary': {
                                            color: message.role === 'USER' ? '#FFFFFF' : '#140A00',
                                        }
                                    }}
                                />
                            </CardStyled>
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef}/>
                </List>
                {isLoading && !isCompletingForm && (
                    <Typography variant="body2"
                                sx={{position: 'absolute', bottom: 100, left: 16, color: 'text.secondary'}}>
                        FitAssist is currently typing...
                    </Typography>
                )}
                {error && (
                    <Paper sx={{p: 1, mt: 1, backgroundColor: 'error.light', color: 'error.contrastText'}}>
                        Error: {error.message}
                    </Paper>
                )}
            </DialogContent>
            <DialogActions sx={{p: 2, justifyContent: 'space-between'}}>
                <TextField
                    data-cy="assist-input"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    variant="outlined"
                    size="small"
                    sx={{flexGrow: 1, mr: 1}}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && inputMessage.trim() && !isLoading) {
                            e.preventDefault();
                            void handleSend(inputMessage);
                        }
                    }}
                />
                <PrimaryButtonStyled
                    data-cy="assist-send-button"
                    variant="contained"
                    endIcon={<Send/>}
                    onClick={() => void handleSend(inputMessage)}
                    disabled={!inputMessage.trim() || isLoading}
                >
                    Send
                </PrimaryButtonStyled>
            </DialogActions>
        </Dialog>
    );
}
