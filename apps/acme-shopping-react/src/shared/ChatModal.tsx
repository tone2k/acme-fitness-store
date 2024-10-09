import { useEffect, useRef, useState } from "react";
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
  Typography,
} from "@mui/material";
import {
  Close,
  Fullscreen,
  FullscreenExit,
  Refresh,
  Send,
} from "@mui/icons-material";
import { useChatService } from "../hooks/useChatService";
import TerrainForm from "../components/TerrainForm";
import RidingPositionForm from "../components/RidingPositionForm";
import FakeBikeRecommendation from "../components/FakeRecommendation";
import { PromptHeaderStyled } from "../components/styled/PromptHeader.styled.tsx";
import { CardStyled } from "../components/styled/Card.styled.tsx";
import { PrimaryButtonStyled } from "../components/styled/PrimaryButton.styled.tsx";
import HeightForm from "../components/HeightForm.tsx";
import parse from "html-react-parser";
import Button from "../components/Button.tsx";
import { useGetUserInfo } from "../hooks/userHooks.ts";
import { useGetCart } from "../hooks/cartHooks.ts";

export default function ChatModal() {
  const [open, setOpen] = useState<boolean>(false);

  const [inputMessage, setInputMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: userInfo } = useGetUserInfo();
  const { data: cartData } = useGetCart(userInfo?.userId || "", userInfo);

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultWidth = { xs: "90vw", sm: "420px" };
  const defaultHeight = { xs: "90vh", sm: "600px" };

  const expandedWidth = { xs: "90vw", sm: "840px" };
  const expandedHeight = { xs: "90vh", sm: "1000px" };

  const handleSend = async (message: string) => {
    if (message.trim()) {
      setInputMessage("");
      await sendMessage(message, cartData);
      setInputMessage("");
    }
  };

  const renderMessageContent = (message: any) => {
    if (message.formType === "FORM1") {
      return <TerrainForm onSubmit={(data) => submitForm("FORM1", data)} />;
    } else if (message.formType === "FORM2") {
      return (
        <RidingPositionForm onSubmit={(data) => submitForm("FORM2", data)} />
      );
    } else if (message.formType === "FORM3") {
      return <HeightForm onSubmit={(data) => submitForm("FORM3", data)} />;
    } else if (message.formType === "RECOMMENDATION") {
      return <FakeBikeRecommendation />;
    } else {
      return <>{parse(message.content)}</>;
    }
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
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
      document
        .querySelectorAll("body > *:not(#chat-dialog)")
        .forEach((element) => {
          element.setAttribute("inert", "true");
        });
    } else {
      document.querySelectorAll("[inert]").forEach((element) => {
        element.removeAttribute("inert");
      });
    }

    return () => {
      document.querySelectorAll("[inert]").forEach((element) => {
        element.removeAttribute("inert");
      });
    };
  }, [open]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <Dialog
          open={open}
          maxWidth={false}
          onClose={() => setOpen(false)}
          disableEnforceFocus
          hideBackdrop
          disableScrollLock
          PaperProps={{
            sx: {
              position: "fixed",
              bottom: 16,
              right: 16,
              m: 0,
              width: isExpanded ? expandedWidth : defaultWidth,
              height: isExpanded ? expandedHeight : defaultHeight,
              pointerEvents: "auto",
              transition: "width 0.3s, height 0.3s",
            },
          }}
        >
          <DialogTitle sx={{ padding: "8px 16px", margin: 0 }}>
            <IconButton
              data-cy="assist-expand-toggle"
              aria-label={isExpanded ? "Shrink modal" : "Expand modal"}
              onClick={toggleExpand}
              sx={{
                position: "absolute",
                left: 8,
                top: 8,
                color: "inherit",
              }}
            >
              {isExpanded ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
            <PromptHeaderStyled>Chat with FitAssist</PromptHeaderStyled>

            <p className="text-xs text-green font-bold">Powered by SpringAI</p>

            <IconButton
              data-cy="assist-close"
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                transition: "transform 0.2s",
              }}
            >
              <Close />
            </IconButton>

            <IconButton
              data-cy="assist-clear"
              aria-label="refresh"
              onClick={refreshChat}
              sx={{ position: "absolute", right: 48, top: 8 }}
            >
              <Refresh />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ p: 1 }}>
            <List
              sx={{
                height: isExpanded ? "calc(100% - 64px)" : "450px",
                overflow: "auto",
                transition: "height 0.3s",
              }}
            >
              {chatHistory.map((message, index) => (
                <ListItem
                  id={`assist-message-${index}`}
                  key={index}
                  sx={{
                    justifyContent:
                      message.role === "USER" ? "flex-end" : "flex-start",
                  }}
                >
                  <CardStyled
                    elevation={2}
                    sx={{
                      p: 1,
                      backgroundColor:
                        message.role === "USER" ? "#5C0A90" : "#F5F5F5",
                      borderRadius:
                        message.role === "USER"
                          ? "20px 20px 0 20px"
                          : "20px 20px 20px 0",
                    }}
                  >
                    <ListItemText
                      primary={renderMessageContent(message)}
                      sx={{
                        wordBreak: "break-word",
                        "& .MuiListItemText-primary": {
                          color:
                            message.role === "USER" ? "#FFFFFF" : "#140A00",
                        },
                      }}
                    />
                  </CardStyled>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>

            {isLoading && !isCompletingForm && (
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  bottom: 100,
                  left: 16,
                  color: "text.secondary",
                }}
              >
                FitAssist is currently typing...
              </Typography>
            )}

            {error && (
              <Paper
                sx={{
                  p: 1,
                  mt: 1,
                  backgroundColor: "error.light",
                  color: "error.contrastText",
                }}
              >
                Error: {error.message}
              </Paper>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
            <TextField
              data-cy="assist-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, mr: 1 }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputMessage.trim() && !isLoading) {
                  e.preventDefault();
                  void handleSend(inputMessage);
                }
              }}
            />
            <PrimaryButtonStyled
              data-cy="assist-send-button"
              variant="contained"
              endIcon={<Send />}
              onClick={() => void handleSend(inputMessage)}
              disabled={!inputMessage.trim() || isLoading}
            >
              Send
            </PrimaryButtonStyled>
          </DialogActions>
        </Dialog>
      )}

      <Button
        onClick={() => setOpen(!open)}
        className="bg-lemon rounded-full size-16 shadow-lg"
      >
        <img src="/icons/question.png" className="size-8" />
      </Button>
    </div>
  );
}
