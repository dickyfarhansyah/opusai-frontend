
const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchDummyModels():Promise<string[]> {
  const dummy_models = ["Qwen3", "Qwen2.5", "Gemma3"]

  await delay(20)
  return dummy_models
}