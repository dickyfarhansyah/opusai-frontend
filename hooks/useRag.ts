import { fetchChunk } from "@/lib/api/rag";
import { useCallback } from "react";

export function useFetchChunk() {
	const getChunk = useCallback(async (chunkId: string) => {
		return await fetchChunk(chunkId);
	}, []);
	return { getChunk };
}
