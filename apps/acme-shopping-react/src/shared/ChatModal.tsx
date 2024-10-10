import { FormEvent, useEffect, useRef, useState } from "react";
import { Send, CloseSharp, CropFree, Refresh } from "@mui/icons-material";
import { ChatMessage, useChatService } from "../hooks/useChatService";
import TerrainForm from "../components/TerrainForm";
import RidingPositionForm from "../components/RidingPositionForm";
import HeightForm from "../components/HeightForm.tsx";
import parse from "html-react-parser";
import Button from "../components/Button.tsx";
import {useGetUserInfo} from "../hooks/userHooks.ts";
import {useGetCart} from "../hooks/cartHooks.ts";
import {useFitAssistSocket} from "../hooks/useFitAssistSocket.ts";
import BikeRecommendation from "../components/BikeRecommendation.tsx";

import "../styles/chat.css";

export default function ChatModal() {
  const [open, setOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [expanded, setExpanded] = useState(false);

  const { data: userInfo } = useGetUserInfo();
  const { data: cartData } = useGetCart(userInfo);

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
    isFormCompleted,
  } = useChatService();
  const {
    socketChatHistory,
    isSocketLoading,
    isConnected,
    isPresentingSelectorForm,
    bikeRecommendation,
    connect,
    disconnect,
    publishQuestion,
    submitTerrain,
  } = useFitAssistSocket();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();

    if (inputMessage.trim()) {
      setInputMessage("");
      publishQuestion(inputMessage, cartData)
      setInputMessage("");
    }
  };

  const renderMessageContent = (message: ChatMessage) => {
    if (message?.formType === "FORM1") {
      return (
        <TerrainForm
          onSubmit={(data) => submitTerrain(data)}
          isExpanded={expanded}
        />
      );
    }

    if (message.formType === "FORM2") {
      return (
        <RidingPositionForm
          onSubmit={(data) => submitForm("FORM2", data)}
          isExpanded={expanded}
        />
      );
    }

    if (message?.formType === "FORM3") {
      return (
        <HeightForm
          onSubmit={(data) => submitForm("FORM3", data)}
          isExpanded={expanded}
        />
      );
    }

    if (message?.formType === "RECOMMENDATION") {
      // return <FakeBikeRecommendation isExpanded={expanded} />; //TODO clean up
        return <BikeRecommendation {...bikeRecommendation}></BikeRecommendation>; //TODO replace with pass in value
    }

    return <div className="chat">{parse(message.content)}</div>;
  };

  const scrollToBottomMessage = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isPresentingSelectorForm) {
      setExpanded(true);
    }
  }, [isPresentingSelectorForm]);

  // reset expanded to false upon open changed
  useEffect(() => {
    if (open) {
      connect();
    } else {
      disconnect();
    }
    setExpanded(false);
    scrollToBottomMessage();
  }, [open]);

  // scroll most recent message into view when new messages are added
  useEffect(() => {
    scrollToBottomMessage();
  }, [chatHistory]);

    useEffect(() => {
        if (isConnected) {
            console.log('Successfully connected to FitAssist WebSocket');
        }
    }, [isConnected]);

  return (
    <div className="fixed bottom-4 right-0 z-50">
      {open && (
        <div className="flex justify-end">
          <div
            className={`bg-white m-4 flex flex-col overflow-hidden rounded w-full h-[32rem] shadow-2xl ${
              expanded ? "md:w-2/3 md:h-[40rem]" : "md:w-96"
            }`}
          >
            <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
              <div>
                <h2 className="text-xl text-chocolate">Chat with FitAssist</h2>
                <p className="text-xs text-navy-600">Powered by SpringAI</p>
              </div>

              <div>
                <Button
                  variant="icon"
                  onClick={() => setExpanded(!expanded)}
                  className="hidden md:inline"
                >
                  <CropFree className="size-6" />
                </Button>

                <Button
                  variant="icon"
                  onClick={() => refreshChat()}
                  className="hidden md:inline"
                >
                  <Refresh className="size-6" />
                </Button>

                <Button variant="icon" onClick={() => setOpen(false)}>
                  <CloseSharp className="size-6" />
                </Button>
              </div>
            </div>

            <div className="flex-grow overflow-auto p-4 space-y-4">
              {socketChatHistory?.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "USER" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2 px-3 max-w-[95%] ${
                        message.role === "USER"
                          ? "bg-navy text-white rounded"
                          : "bg-navy-50 border-2 border-navy-100"
                      }`}
                    >
                      {renderMessageContent(message)}
                    </div>
                  </div>
                );
              })}

              {isSocketLoading && !isPresentingSelectorForm && (
                <p className="text-black/50">
                  FitAssist is currently typing...
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4">
              <div className="flex space-x-2">
                <input
                  className="w-full indent-3 focus:outline-none border rounded border-black/50"
                  type="text"
                  placeholder="Ask anything about our bikes..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />

                <Button type="submit" variant="icon">
                  <Send className="h-4 w-4 text-black/50" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!open ? (
        <Button
          onClick={() => setOpen(!open)}
          className="bg-lemon rounded-full size-16 shadow-lg mr-4"
        >
          <img src="/icons/question.png" alt="FitAssist" className="size-8" />
        </Button>
      ) : null}
    </div>
  );
}
