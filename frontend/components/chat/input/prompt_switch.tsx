import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InputGroupButton } from "@/components/ui/input-group"
import { useGetPrompt, useIsThinking, useSetPrompt } from "@/hooks/useChat"
import { useAvailablePrompts } from "@/hooks/usePrompt"
import { ChevronDownIcon } from "lucide-react"
import { memo, useCallback, useState } from "react"
import { CustomPromptDialog, CustomPromptMenuItem } from "../prompt/prompt"

const ChatPromptSwitch = memo(function ChatPromptSwitch() {
  const isThinking = useIsThinking()
  const availablePrompts = useAvailablePrompts()
  const prompt = useGetPrompt()
  const [selectedTitle, setSelectedTitle] = useState("")
  const setPrompt = useSetPrompt()
  const [showCustomDialog, setShowCustomDialog] = useState<boolean>(false)

  const select_handler = useCallback((title:string) => {
    const selected_prompt = availablePrompts.find((prompt) => prompt.title === title)
    const new_prompt = selected_prompt?.prompt || ""
    setSelectedTitle(title)
    setPrompt(new_prompt)
  }, [availablePrompts, setPrompt, setSelectedTitle])

  return (
    <>
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
          <CustomPromptMenuItem onOpenDialog={() => setShowCustomDialog(true)}/>
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
      <CustomPromptDialog open={showCustomDialog} onOpenChange={setShowCustomDialog} onSave={setPrompt} onSaveSetTitle={setSelectedTitle}/>
    </>
  )
})

export {ChatPromptSwitch}