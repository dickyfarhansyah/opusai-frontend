import { promptStore } from "@/lib/store/prompt_store";
import { useEffect, useRef } from "react";


export function useAvailablePrompts() {
  return promptStore(state => state.availablePrompts)
}

export function useFetchPrompts() {
  const availablePrompts = useAvailablePrompts()
  const loadPrompts = promptStore(state => state.loadPrompts)
  const hasLoaded = useRef(false)

  useEffect(() => {
    if (availablePrompts.length === 0 && !hasLoaded.current) {
      hasLoaded.current = true
      loadPrompts()
    }
  }, [loadPrompts, availablePrompts.length])
}
