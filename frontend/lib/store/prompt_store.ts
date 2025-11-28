import { fetchPrompts } from "@/lib/api/prompt";
import { create } from "zustand";
import { PromptType } from "../type/prompt_type";

interface promptStore {
  availablePrompts: PromptType[]
  loadPrompts: () => Promise<void>
  setAvailablePrompts: (prompts:PromptType[]) => void
}


export const promptStore = create<promptStore>((set, get) => ({
  availablePrompts:[],
  loadPrompts: async () => {
    try {
      const prompts = await fetchPrompts()
      get().setAvailablePrompts(prompts)
    } catch(error) {
      console.error('ERROR fetching prompts: ', error)
    } 
  },
  setAvailablePrompts: (prompts:PromptType[]) => set({availablePrompts:prompts})
}))