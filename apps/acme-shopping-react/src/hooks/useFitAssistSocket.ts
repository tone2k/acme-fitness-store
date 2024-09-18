import {useCallback, useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';
import {getCurrentProductInView, parseMessageContentAndBuildLinks} from "../utils/helpers.ts";
import {AcmeChatResponse, ChatMessage} from "./useChatService.ts";

const STORAGE_KEY = 'acme_chat_history';

export const useFitAssistSocket = () => {
    const [client, setClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    //From ChatService
    const [socketChatHistory, setSocketChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        const stompClient = new Client({
            brokerURL: '/websocket/ai/v2',
        });

        stompClient.onConnect = () => {
            stompClient.subscribe('/greetings', message => {
                console.log(`Received message: ${message.body}`);
            });

            stompClient.subscribe('/answer', messages => {
                console.log(`Answer message: ${messages.body}`);
                const response:AcmeChatResponse = JSON.parse(messages.body)
                handleAnswer(response.messages);
            })

            stompClient.publish({
                destination: '/hello',
                body: JSON.stringify(
                    {
                        conversationId: 'test-id',
                        userId: 'react-frontend',
                        page: '/'
                    }),
            });
            setIsConnected(true);
        };

        stompClient.onDisconnect = () => {
            console.log('Disconnected from FitAssist WebSocket');
            setIsConnected(false);
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.onWebSocketError = (error) => {
            console.error('WebSocketError' + error);
        }

        // stompClient.activate();
        console.log("Activated Websocket")
        setClient(stompClient);

        return () => {
            if (stompClient.active) {
                stompClient.deactivate();
            }
        };
    }, []);

    const connect = () => {
        if (client && !client.active) {
            client.activate();
            console.log('Connected to FitAssist WebSocket');
        }
    };

    const disconnect = () => {
        if (client && client.active) {
            client.deactivate();
        }
    };

    const saveChatHistory = useCallback((history: ChatMessage[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }, []); //todo REFACTOR

    const publishQuestion = (message: string) => {
        setIsLoading(true);
        setError(null);

        const newUserMessage: ChatMessage = {
            content: message,
            role: 'USER',
            formType: null,
        };

        const updatedHistory = [...socketChatHistory, newUserMessage];
        setSocketChatHistory(updatedHistory);
        saveChatHistory(updatedHistory);

        const refinedHistory = [...updatedHistory]
        if (updatedHistory[0].role === "ASSISTANT") {
            refinedHistory.shift();
        }
        const payload = {
            messages: refinedHistory.map(msg => ({
                content: msg.content,
                role: msg.role
            }))
        };
        const latestMsg = payload['messages'].pop();
        // payload['messages'].push({content: cartData, role: 'USER'});
        // payload['messages'].push({content: getCurrentProductInView(), role: 'USER'})
        payload['messages'].push(latestMsg);
        client.publish({
            destination: '/question',
            body: JSON.stringify(payload),
        });
        setSocketChatHistory(updatedHistory);
        saveChatHistory(updatedHistory);
    }

    const handleAnswer = (messages: string[]) => {
        if (messages && messages.length > 0) {
            const assistantMessages = messages.map(content => ({
                content: parseMessageContentAndBuildLinks(content),
                role: 'ASSISTANT' as const,
                formType: null
            }));

            const newHistory = [...socketChatHistory, ...assistantMessages];
            setSocketChatHistory(newHistory);
            saveChatHistory(newHistory);
        }
    }

    return {
        socketChatHistory,
        client,
        isConnected,
        connect,
        disconnect,
        publishQuestion,
    };
};
