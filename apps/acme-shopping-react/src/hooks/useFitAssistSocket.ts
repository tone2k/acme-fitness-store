import {useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';

export const useFitAssistSocket = () => {
    const [client, setClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: '/websocket/ai/v2',
        });

        stompClient.onConnect = () => {
            console.log('Connected to FitAssist WebSocket');

            stompClient.subscribe('/greetings', message => {
                console.log(`Received message: ${message.body}`);
            });

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

        stompClient.activate();
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
        }
    };

    const disconnect = () => {
        if (client && client.active) {
            client.deactivate();
        }
    };

    return {client, isConnected, connect, disconnect};
};
