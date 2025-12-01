import { InputGroupButton } from "@/components/ui/input-group"
import { useAppendFile, useGetFiles, useIsThinking } from "@/hooks/useChat"
import { MAX_FILE_UPLOAD_COUNT } from "@/lib/config/constants"
import { chat_file_schema } from "@/lib/validator/chat/file"
import { FileIcon } from "lucide-react"
import { ChangeEvent, memo, useRef } from "react"



const ChatFileUpload = memo(
  function ChatFileUpload() {
    const isThinking = useIsThinking()
    const fileClickRef = useRef<HTMLInputElement>(null)
    const files = useGetFiles()
    const appendFile = useAppendFile()

    const handle_file_click = () => {
      fileClickRef.current?.click()
    }

    const handle_file_on_change = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) {
        return
      }

      if (files.length >= MAX_FILE_UPLOAD_COUNT) {
        alert('Can only upload 3 files')
        e.target.value = ''
        return
      }

      const validated = chat_file_schema.safeParse(file)

      if (!validated.success) {
        alert('File is not validated!')
        return
      } else {
        appendFile(file)
        e.target.value = ''
      }
    }

    return (
      <form>
        <InputGroupButton
          size="icon-sm"
          aria-label="upload file"
          title="File"
          disabled={isThinking || files.length >= MAX_FILE_UPLOAD_COUNT}
          onClick={handle_file_click}
          type="button"
        >
          <FileIcon />  <input ref={fileClickRef} type="file" className="sr-only" accept="application/*" onChange={handle_file_on_change} />
        </InputGroupButton>
      </form>
    )
  }
)

export {ChatFileUpload}