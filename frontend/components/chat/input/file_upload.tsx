import { InputGroupButton } from "@/components/ui/input-group"
import { useIsThinking } from "@/hooks/useChat"
import { FileIcon } from "lucide-react"


function ChatFileUpload() {
  const isThinking = useIsThinking()

  return (
    <InputGroupButton
      size="icon-sm"
      aria-label="upload file"
      title="File"
      disabled={isThinking}
    >
      <FileIcon />
    </InputGroupButton>
  )
}

export {ChatFileUpload}