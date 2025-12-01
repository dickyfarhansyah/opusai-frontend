import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroupButton } from "@/components/ui/input-group";
import { useAvailableModels, useIsThinking, useSelectedModel, useSetSelectedModel } from "@/hooks/useChat";
import { ChevronDownIcon } from "lucide-react";
import { memo } from "react";


const ChatModelSwitch = memo(
  function ChatModelSwitch() {
    const isThinking = useIsThinking();
    const availableModels = useAvailableModels()
    const selectedModel = useSelectedModel()
    const setSelectedModel = useSetSelectedModel()
    console.log('Am i re rendered switchModel')
  
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
              <span className="text-xs pl-1.5">{selectedModel || "Choose model"}</span>
            </div>
          </InputGroupButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {availableModels.map((model) => (
            <DropdownMenuItem 
              key={model}
              onClick={() => setSelectedModel(model)}
            >
              {model}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)


export { ChatModelSwitch }