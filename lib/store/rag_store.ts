import { create } from "zustand";
import { insertKnowledge } from "../api/rag";

interface insertionResponseSchema {
	message: string;
	success_count: number;
	failed_count: number;
}

interface RagStoreState {
	files: File[];
	isLoading: boolean;
	appendFile: (file: File | File[]) => void;
	removeFile: (index: number) => void;
	resetFiles: () => void;
	insertion: (
		use_gpu: boolean,
		smartsearch: boolean,
	) => Promise<insertionResponseSchema>;
	setLoading: (value: boolean) => void;
}

export const ragStoreState = create<RagStoreState>((set, get) => ({
	files: [],
	isLoading: false,
	appendFile: (files: File | File[]) => {
		if (Array.isArray(files)) {
			set((state) => ({ files: [...state.files, ...files] }));
		} else {
			set((state) => ({ files: [...state.files, files] }));
		}
	},
	removeFile: (index: number) =>
		set((state) => ({
			files: state.files.filter((_, i) => i !== index),
		})),
	resetFiles: () => set({ files: [] }),
	insertion: async (
		use_gpu: boolean = false,
		smart_search: boolean = false,
	) => {
		set({ isLoading: true });
		const uploadedFiles = get().files;
		try {
			const response = await insertKnowledge(
				uploadedFiles,
				use_gpu,
				smart_search,
			);
			return response;
		} catch (err) {
			console.error(err);
			throw err instanceof Error
				? err
				: new Error("Failed to insert knowledge");
		} finally {
			try {
				set({ isLoading: false });
			} catch (cleanUp) {
				console.error("Failed to reset loading state", cleanUp);
			}
		}
	},
	setLoading: (value: boolean) => set({ isLoading: value }),
}));
