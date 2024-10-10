import {useCallback, useEffect, useRef, useState} from 'react';
import {Client} from '@stomp/stompjs';
import {getCurrentProductInView, parseMessageContentAndBuildLinks, summarizeCart} from "../utils/helpers.ts";
import {ChatMessage, GreetingResponse} from "./useChatService.ts";
import {FormRecommendationData} from "../types/FormRecommendationData.ts";
import {BikeRecommendationProps} from "../components/BikeRecommendation.tsx";
import {CartData} from "../types/Cart.ts";

const STORAGE_KEY = 'acme_chat_history';

interface AcmeChatResponse {
    data: string,
    messageId: string,
    messageType: string,
}

interface AcmeDisplayRequest {
    messageId: string,
}

interface AcmeProductRequest {
    messageId: string,
    productId: string,
    productName: string,
    productDescription: string,
    productPrice: string,
    productImage: string,
    bikeRecommendation: string,
}

export const useFitAssistSocket = () => {
    const [client, setClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [userId, setUserId] = useState(`no-user`);
    const [messageId, setMessageId] = useState(`no-message-id`);
    const [bikeRecommendation, setBikeRecommendation] = useState<BikeRecommendationProps>({
        productName: 'Bike name',
        productId: 'no-product-id',
        productPrice: '1000',
        productDescription: 'Short Description',
        productImage: '/static/images/new_bikes_1.jpg',
        recommendationText: 'Recommend Text'
    })

    //From ChatService
    const [socketChatHistory, setSocketChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [formData, setFormData] = useState<FormRecommendationData>({});
    const [isPresentingSelectorForm, setIsPresentingSelectorForm] = useState<boolean>(false);

    const stateRef = useRef();
    stateRef.current = socketChatHistory;

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: '/websocket/ai/v2',
        });

        stompClient.onConnect = () => {
            stompClient.subscribe('/chatResponse', message => {
                const response: AcmeChatResponse = JSON.parse(message.body);
                console.log(`ChatResponse message:  + ${message.body}`);
                switch (response.messageType) {
                    case 'greeting':
                        handleGreeting(JSON.parse(response.data))
                        break;
                    case 'question':
                        handleAnswer(JSON.parse(response.data).messages)
                        break;
                    case 'user-prompt':
                        displayTerrain(JSON.parse(response.data))
                        break;
                    case 'display-prompt':
                        displayProduct(JSON.parse(response.data))
                        break;
                    default:
                        break;
                }
            })

            publishGreetings();
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
    }, [userId]);

    const connect = () => {
        // setUserId(newUserId);
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

    const loadChatHistory = useCallback(() => {
        const storedHistory = localStorage.getItem(STORAGE_KEY);
        return storedHistory ? JSON.parse(storedHistory) : [];
    }, []);


    const initializeChatHistory = useCallback(() => {
        const loadedHistory = loadChatHistory();
        if (loadedHistory.length === 0) {
            if (isConnected) {
                publishGreetings();
            }
        } else {
            setSocketChatHistory(loadedHistory);
        }
    }, [loadChatHistory, isConnected]);

    useEffect(() => {
        initializeChatHistory();
    }, [initializeChatHistory]);

    const saveChatHistory = useCallback((history: ChatMessage[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }, []); //todo REFACTOR

    const publishQuestion = (message: string, cartData?: CartData) => {
        setIsLoading(true);
        setError(null);

        const newUserMessage: ChatMessage = {
            content: message,
            role: 'USER',
            formType: null,
        };

        const updatedHistory = [...socketChatHistory, newUserMessage];
        // setSocketChatHistory(updatedHistory);
        // saveChatHistory(updatedHistory);

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
        if (cartData != null) {
            payload["messages"].push({
                content: summarizeCart(cartData),
                role: "USER",
            });
        }
        payload['messages'].push({content: getCurrentProductInView(), role: 'USER'})
        payload['messages'].push(latestMsg);
        setSocketChatHistory(updatedHistory);
        // saveChatHistory(updatedHistory);

        const requestPayload = JSON.stringify(payload)
        client.publish({
            destination: '/chatRequest',
            body: JSON.stringify({
                data: requestPayload,
                messageType: 'question'
            }),
        });
    };

    const publishGreetings = () => {
        const greetingsContent = JSON.stringify(
            {
                conversationId: 'test-id',
                userId: 'react-frontend',
                page: '/'
            });
        client.publish({
            destination: `/chatRequest`,
            body: JSON.stringify(
                {
                    data: greetingsContent,
                    messageType: 'greeting'
                }),
        });
    }

    const handleGreeting = (response: GreetingResponse) => {
        if (response) {
            console.log('handle greeting - ' + response);
            // setSuggestedPrompts(response.suggestedPrompts)
            const initialMessages: ChatMessage[] = [
                {content: response.greeting, role: 'ASSISTANT', formType: null}
            ];
            setSocketChatHistory(initialMessages);
            saveChatHistory(initialMessages);
        } else {
            console.error('No greeting response received');
        }
    }

    const handleAnswer = (messages: string[]) => {
        if (messages && messages.length > 0) {
            const assistantMessages = messages.map(content => ({
                content: parseMessageContentAndBuildLinks(content),
                role: 'ASSISTANT' as const,
                formType: null
            }));

            const newHistory = [...stateRef.current, ...assistantMessages];
            setSocketChatHistory(newHistory);
            // saveChatHistory(newHistory);
        }
    }

    const displayTerrain = (request: AcmeDisplayRequest) => {
        setIsPresentingSelectorForm(true)
        setMessageId(request.messageId)
        const form1Message: ChatMessage = {
            content: 'Select a terrain',
            role: 'ASSISTANT',
            formType: 'FORM1',
        };

        const newHistory = [...stateRef.current, form1Message];
        setSocketChatHistory(newHistory);
        // saveChatHistory(newHistory);
    }

    const submitTerrain = (data: FormRecommendationData) => {
        const terrainRequest = JSON.stringify(
            {
                data: data.terrain,
                messageId: messageId,
            });
        client.publish({
            destination: `/chatRequest`,
            body: JSON.stringify({
                    data: terrainRequest,
                    messageType: 'user-prompt',
                }
            ),
        });

    }
    const displayProduct = (request: AcmeProductRequest) => {
        console.log('Display AcmeProductRequest - Message:' + request)
        setBikeRecommendation({
                productName: request.productName,
                productId: request.productId,
                productPrice: request.productPrice,
                productDescription: request.productDescription,
                productImage: request.productImage,
                recommendationText: request.bikeRecommendation,
            }
        )

        const recommendationMessage: ChatMessage = {
            content: '',
            role: 'ASSISTANT',
            formType: 'RECOMMENDATION',
        };

        const newHistory = [...stateRef.current, recommendationMessage];
        setSocketChatHistory(newHistory);
    }

    return {
        socketChatHistory,
        client,
        isConnected,
        isPresentingSelectorForm,
        bikeRecommendation,
        connect,
        disconnect,
        publishQuestion,
        submitTerrain,
    };
};
