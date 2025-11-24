import * as React from "react";
import ChatMessageType from "@/lib/type/chat_message";
import { messageStore } from "@/lib/store/message_store";
import { conversationStore } from "@/lib/store/conversation_store";
import { ChatConversationType } from "@/lib/type/conversation";

interface useChatHook {
  messages: ChatMessageType[];
  conversations: ChatConversationType[];
  currentConversationId: string | null;
  appendMessage: ({
    role,
    message,
  }: {
    role: "assistant" | "user";
    message: string;
  }) => void;
  createConversation: (title: string) => void;
  switchConversation: (id: string) => void;
}

export default function useChat(): useChatHook {
  const { messages, appendMessage } = messageStore();
  const {
    conversations,
    currentConversationId,
    createConversation,
    switchConversation,
  } = conversationStore();
  return {
    messages: messages,
    conversations: conversations,
    currentConversationId: currentConversationId,
    appendMessage: appendMessage,
    createConversation: createConversation,
    switchConversation: switchConversation,
  };
}
