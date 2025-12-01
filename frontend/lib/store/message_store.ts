import { create } from "zustand";
import ChatMessageType from "../type/chat_message";
import { fetchDummyModels } from "../api/models";
import { ChatParameterSettingsType } from "../type/chat_parameter";
import { ChatParameterSettings } from "@/components/chat/input/parameter_settings";

interface MessageStoreState {
  messages: ChatMessageType[];
  shouldResponse:boolean;
  streamingMessageId:string | null;
  isThinking:boolean;
  messageScratchpad:string;
  availableModels:string[];
  selectedModel:string;
  isLoadingModels: boolean;
  prompt: string
  files: File[]
  parameter: ChatParameterSettingsType
  createEmptyMessageForStream: (conversationId:string) => string;
  updateMessageChunk: ({id, chunk}: {id:string, chunk:string}) => void;
  appendMessage: ({
    conversationId,
    role,
    message,
  }: {
    conversationId:string;
    role: "assistant" | "user";
    message: string;
  }) => void;
  setShouldResponse: (e:boolean) => void;
  setIsThinking: (e:boolean) => void;
  setStreamingMessageId: (id:string | null) => void;
  setMessageScratchpad: (value:string) => void;
  setSelectedModel: (model:string) => void;
  setAvailableModels: (models:string[]) => void;
  loadModels: () => Promise<void>;
  setPrompt: (prompt:string) => void;
  appendFile: (file:File) => void;
  removeFile: (index:number) => void;
  setParameter: ({temperature}:ChatParameterSettingsType) => void;
}

const appendMessageFunc = ({state, role, message, conversationId, id,} : {state:MessageStoreState, role:"assistant" | 'user', message:string, conversationId:string, id?:string}) => {
      const last_msg:ChatMessageType = state.messages[state.messages.length - 1]
      if (last_msg?.role === 'assistant' && last_msg?.message === message) {
        return state
      }
      const new_message: ChatMessageType = {
        id: id? id:crypto.randomUUID(),
        conversationId:conversationId,
        role: role,
        message: message,
      };
      return {
        messages: [...state.messages, new_message],
      };
}

export const messageStore = create<MessageStoreState>((set, get) => ({
  messages: [],
  isThinking: false,
  streamingMessageId:null,
  messageScratchpad:"",
  availableModels: [],
  selectedModel: "",
  isLoadingModels: false,
  prompt:"",
  files: [],
  parameter: {temperature:0.7},
  updateMessageChunk: ({id, chunk}: {id:string, chunk:string}) => {
    set((state) => {
      return {messages:state.messages.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            // message: msg.message.length === 0 ? chunk : msg.message + ' ' + chunk
            message: chunk
          }
        } else {
          return msg
        }
      })}
    })
  },
  createEmptyMessageForStream: (conversationId:string) => {
    const empty_msg_id:string = crypto.randomUUID()
    set((state) => {
      return appendMessageFunc({state:state, role:"assistant", message:"", conversationId:conversationId, id:empty_msg_id})
    })
    return empty_msg_id
  },
  appendMessage: ({
    conversationId,
    role,
    message,
  }: {
    conversationId: string
    role: "assistant" | "user";
    message: string;
  }) =>
    set((state) => {
      const params = {
        state:state,
        role:role,
        conversationId:conversationId,
        message:message,
      }
      return appendMessageFunc(params)
    }),
    shouldResponse: false,
    setShouldResponse: (e:boolean) => set({shouldResponse: e}),
    setIsThinking: (e:boolean) => set({isThinking: e}),
    setStreamingMessageId: (id:string | null) => set({streamingMessageId: id}),
    setMessageScratchpad: (value:string) => set({messageScratchpad: value}),
    setAvailableModels: (models:string[]) => set({availableModels:models, selectedModel:get().selectedModel || models[0] || ""}),
    setSelectedModel: (model:string) => set({selectedModel:model}),
    loadModels: async () => {
      set({isLoadingModels:true})
      try {
        const models = await fetchDummyModels()
        get().setAvailableModels(models)
      } catch(error) {
        console.error("Cannot fetch models: ", error)
      } finally {
        set({isLoadingModels:false})
      }
    },
    setPrompt: (prompt:string) => set({prompt:prompt}),
    appendFile: (file:File) => set((state) => ({files: [...state.files, file]})),
    removeFile: (index:number) => set((state) => {
      return {files: state.files.filter((_, i) => i !== index)}
    }),
    setParameter: ({temperature}:ChatParameterSettingsType) => set({parameter: {temperature}})
}));
