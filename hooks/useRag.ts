import { fetchChunk, fetchPdf } from "@/lib/api/rag";
import { ragStoreState } from "@/lib/store/rag_store";
import { useCallback } from "react";

export function useFetchChunk() {
	const getChunk = useCallback(async (chunkId: string) => {
		return await fetchChunk(chunkId);
	}, []);
	return { getChunk };
}

export function useFetchPdf() {
	const getPdf = useCallback(async (filename: string) => {
		return await fetchPdf(filename);
	}, []);
	return { getPdf };
}

export function useGetInsertionFiles() {
	return ragStoreState((state) => state.files);
}

export function useIsInsertionLoading() {
	return ragStoreState((state) => state.isLoading);
}

export function useAppendInsertionFile() {
	return ragStoreState((state) => state.appendFile);
}

export function useRemoveInsertionFile() {
	return ragStoreState((state) => state.removeFile);
}

export function useResetInsertionFiles() {
	return ragStoreState((state) => state.resetFiles);
}

export function useInsertion() {
	return ragStoreState((state) => state.insertion);
}

export function useSetInsertionIsLoading() {
	return ragStoreState((state) => state.setLoading);
}
