import { ListItem, Paper, ListItemText } from '@mui/material';
import { useEffect } from 'react';

interface ChatMessageProps {
    message: {
        role: string;
        content: string;
    };
    index: number;
    createMarkup: (content: string) => { __html: string };
}

export default function ChatMessage({ message, index, createMarkup }: ChatMessageProps) {

    useEffect(() => {
        const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
    
          const nameInput = document.getElementById('nameInput') as HTMLInputElement;
          const emailInput = document.getElementById('emailInput') as HTMLInputElement;
          const messageInput = document.getElementById('messageInput') as HTMLTextAreaElement;
    
          const name: string = nameInput.value;
          const email: string = emailInput.value;
          const message: string = messageInput.value;
    
          console.log('Name:', name);
          console.log('Email:', email);
          console.log('Message:', message);
        };
    
        const form: HTMLFormElement | null = document.getElementById('interactiveForm') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', (event: SubmitEvent) => {
                event.preventDefault();
                handleFormSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
              });
        }
    
        return () => {
          if (form) {
            form.removeEventListener('submit', handleFormSubmit as unknown as EventListener);
        }
        };
      }, []);
      
    return (
        <ListItem
            id={`assist-message-${index}`}
            key={index}
            sx={{
                justifyContent: message.role === 'USER' ? 'flex-end' : 'flex-start',
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    p: 1,
                    maxWidth: '70%',
                    backgroundColor: message.role === 'USER' ? 'primary.light' : 'grey.200',
                    borderRadius: message.role === 'USER' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                }}
            >
                <ListItemText
                    primary={<span dangerouslySetInnerHTML={createMarkup(message.content)} />}
                    sx={{
                        wordBreak: 'break-word',
                        '& .MuiListItemText-primary': {
                            color: message.role === 'USER' ? 'primary.contrastText' : 'text.primary',
                        }
                    }}
                />
            </Paper>
        </ListItem>
    );
}