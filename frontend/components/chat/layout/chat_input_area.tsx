'use client'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SendIcon, X, XIcon } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { useIsThinking, useSendMessage } from "@/hooks/useChat";
import useDebounce from "@/hooks/useDebounce";
import {redirect, RedirectType} from "next/navigation"
import { ChatModelSwitch } from "../input/model_switch";
import { ChatFileUpload } from "../input/file_upload";
import { ChatPromptSwitch } from "../input/prompt_switch";
import { Button } from "@/components/ui/button";
import { ChatFileContainer } from "../files/files";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatParameterSettings } from "../input/parameter_settings";


export default function ChatInputArea({isRedirect=true} : {isRedirect?:boolean}) {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)
  const sendMessage = useSendMessage()
  const isThinking = useIsThinking()

  function prevent_default_enter(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const convId:string | null = sendMessage(query)
      setQuery("")
      if (isRedirect) {
        redirect(`/chat/${convId}`, RedirectType.push)
      }
    }
  }

  return (
    <div className="p-2 md:h-48 lg:h-48">
      <div className="h-8">
        <ChatFileContainer />
      </div>
      <div className="flex gap-1 mx-auto max-w-3xl items-center">
        {/* <ScrollArea className="flex gap-1 mx-auto max-w-3xl items-center overflow-auto"> */}

        <InputGroup className="rounded-2xl">
          <InputGroupTextarea
            id="user-query"
            value={query}
            className="min-h-8 max-h-22"
            placeholder="Asks your question..."
            onKeyDown={prevent_default_enter}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isThinking}
          />
          <InputGroupAddon align="block-end">
          <div className="flex items-center h-4 gap-2">
            <ChatFileUpload />
            <Separator orientation="vertical"/>
            <ChatModelSwitch />
            <Separator orientation="vertical"/>
            <ChatPromptSwitch />
            <Separator orientation="vertical"/>
            <ChatParameterSettings />
          </div>

            <InputGroupButton
              aria-label="send question"
              title="Send"
              className="ml-auto"
              disabled={debouncedQuery === "" || isThinking ? (true) : (false)}
              onClick={() => {
                sendMessage(query)
                setQuery('')
              }}
            >
              <SendIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {/* </ScrollArea> */}
      </div>
    </div>
  );
}
