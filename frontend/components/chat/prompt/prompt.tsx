import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useAvailablePrompts } from "@/hooks/usePrompt";
import { PencilIcon } from "lucide-react";
import { memo } from "react";



export function ChatPromptLayout() {


  return (
    <Dialog>
      <ChatPromptButtonTrigger />
      <DialogContent className="max-h-[60vh] overflow-y-auto">
        <ChatPromptList />
      </DialogContent>
    </Dialog>
  )
}

function ChatPromptButtonTrigger() {
  return (
    <DialogTrigger asChild>
      <Button className="w-full justify-start p-0 text-md" variant="ghost">
        Prompt
      </Button>
      {/* Prompt */}
    </DialogTrigger>
  )
}

function ChatPromptList() {
  const availablePrompts = useAvailablePrompts()
  return (
    <Accordion type="single" collapsible>
      <DialogTitle>Prompts</DialogTitle>
      {
        availablePrompts.map((e) => (
          <ChatPromptElement key={e.id} id={e.id} title={e.title} prompt={e.prompt}/>
        ))
      }
    </Accordion>
  )
}

const ChatPromptElement = memo(function ChatPromptElement({id, title, prompt}: {id:string, title:string, prompt:string}) {
  return (
    <AccordionItem value={"id"+ id} key={id}>
      <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            {prompt}
          </p>
          {/* <div className="w-[50%]">
            <Button size="icon-sm" className="cursor-pointer" variant="ghost" onClick={editFn}>
              <PencilIcon size="size-3" className="h-5 w-5"/>
            </Button>
          </div> */}
        </AccordionContent>
    </AccordionItem>
  )
})