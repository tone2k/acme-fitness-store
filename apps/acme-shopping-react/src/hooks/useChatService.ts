import { useState, useEffect, useCallback } from 'react';
import {socket} from '../socket.ts';
import { getCurrentProductInView, parseMessageContentAndBuildLinks } from "../utils/helpers.ts";
import { FormRecommendationData } from '../types/FormRecommendationData.ts';

interface ChatMessage {
    content: string;
    role: 'USER' | 'ASSISTANT';
    formType: 'FORM1' | 'FORM2' | 'FORM3' | null;
}

interface GreetingResponse {
    conversationId: string;
    greeting: string;
    suggestedPrompts: string[];
}

const STORAGE_KEY = 'acme_chat_history';

export const useChatService = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
    const [currentForm, setCurrentForm] = useState<'FORM1' | 'FORM2' | 'FORM3' | null>(null);
    const [formData, setFormData] = useState<FormRecommendationData>({});
    const [isCompletingForm, setIsCompletingForm] = useState<boolean>(false);
    const [isFormCompleted, setIsFormCompleted] = useState<boolean>(false);

    const loadChatHistory = useCallback(() => {
        const storedHistory = localStorage.getItem(STORAGE_KEY);
        return storedHistory ? JSON.parse(storedHistory) : [];
    }, []);

    const saveChatHistory = useCallback((history: ChatMessage[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }, []);

    const handleIncomingMessage = useCallback((message: ChatMessage) => {
        setChatHistory((prevHistory) => {
            const updatedHistory = [...prevHistory, message];
            saveChatHistory(updatedHistory);
            return updatedHistory;
        });
    }, [saveChatHistory]);

    const fetchGreeting = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            socket.emit('hello', { conversationId: crypto.randomUUID(), page: window.location.pathname });

            const onGreeting = (data: GreetingResponse) => {
                setSuggestedPrompts(data.suggestedPrompts);
                const initialMessages: ChatMessage[] = [
                    { content: data.greeting, role: 'ASSISTANT', formType: null }
                ];
                setChatHistory(initialMessages);
                saveChatHistory(initialMessages);
                resolve();
            };

            const onError = (err: any) => {
                const error = err instanceof Error ? err : new Error('An error occurred fetching greeting');
                setError(error);
                console.error('Error fetching greeting:', err);
                reject(error);
            };

            socket.once('greeting', onGreeting);
            socket.once('error', onError);
        });
    }, [saveChatHistory]);

    const initializeChatHistory = useCallback(() => {
        const loadedHistory = loadChatHistory();
        if (loadedHistory.length === 0) {
            fetchGreeting();
        } else {
            setChatHistory(loadedHistory);
        }
    }, [loadChatHistory, fetchGreeting]);

    useEffect(() => {
        socket.connect();

        initializeChatHistory();

        socket.on('response', handleIncomingMessage);

        socket.on('error', (err: any) => {
            const error = err instanceof Error ? err : new Error('An error occurred');
            setError(error);
            console.error('Socket error:', err);
        });

        return () => {
            socket.off('response', handleIncomingMessage);
            socket.off('error');
            socket.disconnect();
        };
    }, [handleIncomingMessage, initializeChatHistory]);

    const sendMessage = useCallback((message: string, cartData: string) => {
        setIsLoading(true);
        setError(null);

        const newUserMessage: ChatMessage = {
            content: message,
            role: 'USER',
            formType: null,
        };

        const updatedHistory = [...chatHistory, newUserMessage];
        setChatHistory(updatedHistory);
        saveChatHistory(updatedHistory);

        if (message.toLowerCase() === 'help me find a bike please') {
            setIsCompletingForm(true);
            setCurrentForm('FORM1');
            const form1Message: ChatMessage = {
                content: 'Select a terrain',
                role: 'ASSISTANT',
                formType: 'FORM1',
            };
            const newHistory = [...updatedHistory, form1Message];
            setChatHistory(newHistory);
            saveChatHistory(newHistory);
            setIsLoading(false);
        } else {
            const refinedHistory = [...updatedHistory];
            if (refinedHistory[0].role === "ASSISTANT") {
                refinedHistory.shift();
            }

            const payload = {
                messages: refinedHistory.map(msg => ({
                    content: msg.content,
                    role: msg.role
                })),
                cartData: cartData,
                product: getCurrentProductInView(),
            };

            socket.emit('question', payload, (response: { messages: string[] }) => {
                if (response && response.messages && response.messages.length > 0) {
                    const assistantMessages: ChatMessage[] = response.messages.map(content => ({
                        content: parseMessageContentAndBuildLinks(content),
                        role: 'ASSISTANT',
                        formType: null
                    }));

                    const newHistory = [...updatedHistory, ...assistantMessages];
                    setChatHistory(newHistory);
                    saveChatHistory(newHistory);
                } else {
                    console.error('Received an empty or malformed response from API');
                }
                setIsLoading(false);
            });
        }
    }, [chatHistory, saveChatHistory]);

    const refreshChat = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setChatHistory([]);
        setSuggestedPrompts([]);
        fetchGreeting().catch((err) => console.error(err));
    }, [fetchGreeting]);

    const submitForm = useCallback(async (formType: 'FORM1' | 'FORM2' | 'FORM3', data: FormRecommendationData) => {
        setFormData({ ...formData, ...data });

        if (formType === 'FORM1') {
            setCurrentForm('FORM2');
            const form2Message: ChatMessage = {
                content: 'Select a riding position',
                role: 'ASSISTANT',
                formType: 'FORM2',
            };
            const newHistory = [...chatHistory, form2Message];
            setChatHistory(newHistory);
            saveChatHistory(newHistory);
        } else if (formType === 'FORM2') {
            setCurrentForm('FORM3');
            const form3Message: ChatMessage = {
                content: 'Excellent! Finally, please fill out this last form:',
                role: 'ASSISTANT',
                formType: 'FORM3',
            };
            const newHistory = [...chatHistory, form3Message];
            setChatHistory(newHistory);
            saveChatHistory(newHistory);
        } else if (formType === 'FORM3') {
            setCurrentForm(null);
            const finalMessage: ChatMessage = {
                content: `These are the customers preferences for a bike, please make a recommendation: ${JSON.stringify({ ...formData, ...data })}`,
                role: 'USER',
                formType: null,
            };

            const newHistory = [...chatHistory, {
                content: 'Excellent! Thank you for completing those.',
                role: 'ASSISTANT',
            }, finalMessage];

            setChatHistory(newHistory);
            saveChatHistory(newHistory);

            socket.emit('question', {
                messages: [finalMessage],
            }, (response: { messages: string[] }) => {
                if (response && response.messages && response.messages.length > 0) {
                    const assistantMessages: ChatMessage[] = response.messages.map(content => ({
                        content: parseMessageContentAndBuildLinks(content),
                        role: 'ASSISTANT',
                        formType: null
                    }));

                    const updatedHistory = [...newHistory, ...assistantMessages];
                    setChatHistory(updatedHistory);
                    saveChatHistory(updatedHistory);
                } else {
                    console.error('Received an empty or malformed response from API');
                }
            });
        }
    }, [chatHistory, formData, saveChatHistory]);

    return {
        chatHistory,
        suggestedPrompts,
        sendMessage,
        refreshChat,
        isLoading,
        error,
        currentForm,
        submitForm,
        isCompletingForm,
        isFormCompleted,
        setIsFormCompleted
    };
};