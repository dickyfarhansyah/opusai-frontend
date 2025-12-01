import { Button } from "@/components/ui/button"
import { useGetFiles, useIsThinking, useRemoveFile } from "@/hooks/useChat"
import { XIcon } from "lucide-react"
import { memo, useMemo } from "react"

export function ChatFileContainer() {
  const files = useGetFiles()
  const removeFile = useRemoveFile()
  const rendered_card_files = useMemo(() => {
    return files.map((file, index) => (<ChatFileCard key={"file-"+index} index={index} delete_handler={() => removeFile(index)} file_name={file.name}/>))
  }, [files])
  return (
    <div className="flex flex-row mx-auto max-w-3xl px-2 items-center">
      {rendered_card_files}
    </div>
  )
}

const ChatFileCard = memo(
  function ChatFileCard({index, file_name, delete_handler} : {index:number, file_name:string, delete_handler:(index:number) => void}) {
    const isThinking = useIsThinking()
    return (
      <div className="flex h-6 w-32 dark:bg-zinc-900 bg-zinc-200 rounded-xl mx-1">
        <span className="text-sm line-clamp-1 px-1">{file_name}</span>
        <Button disabled={isThinking} variant="ghost" size="icon-sm" className="rounded-full h-4 w-4 mx-1 my-1 cursor-pointer" onClick={() => delete_handler(index)}>
          <XIcon size={12}/>
        </Button>
      </div>
    )
  }
)