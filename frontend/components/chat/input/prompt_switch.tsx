import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InputGroupButton } from "@/components/ui/input-group"
import { useGetPrompt, useIsThinking, useSetPrompt } from "@/hooks/useChat"
import { useAvailablePrompts } from "@/hooks/usePrompt"
import { ChevronDownIcon } from "lucide-react"
import { useCallback, useMemo, useRef, useState } from "react"

export function ChatPromptSwitch() {
  const isThinking = useIsThinking()
  const availablePrompts = useAvailablePrompts()
  const prompt = useGetPrompt()
  const selectedTitle = useMemo(() => availablePrompts.find(p => p.prompt === prompt)?.title || "", [availablePrompts, prompt])
  const setPrompt = useSetPrompt()

  const select_handler = useCallback((title:string) => {
    const selected_prompt = availablePrompts.find((prompt) => prompt.title === title)
    const new_prompt = selected_prompt?.prompt || ""
    setPrompt(new_prompt)
    console.log("printing prompt: ", new_prompt)
  }, [availablePrompts, setPrompt])


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <InputGroupButton
          id="selected-model"
          title="Change model"
          aria-label="Change model"
          disabled={isThinking}
        >
          <div className="flex items-center">
            <ChevronDownIcon className="size-3" />
            <span className="text-xs pl-1.5">{selectedTitle || "Choose prompt"}</span>
          </div>
        </InputGroupButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {availablePrompts.map((prompt) => (
          <DropdownMenuItem 
            key={prompt.id}
            onClick={() => select_handler(prompt.title)}
          >
            {prompt.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}