import { PromptType } from "../type/prompt_type"

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms))


export async function fetchPrompts() {
  const template_prompts:PromptType[] = [
    {id:crypto.randomUUID(), title:"Normal prompt", prompt:"You are a helpful assistant, please help me answer my questions!"},
    {id:crypto.randomUUID(), title:"Notary prompt", prompt:"Act and think like you are a notary!"},
  ]
  delay(50)

  return template_prompts
}