import { create } from "zustand";

interface successStoreType {
	success: string[];
	appendSuccess: (msg: string) => void;
	removeSuccess: (idx: number) => void;
	removeAllSuccess: () => void;
}

export const successStore = create<successStoreType>((set) => ({
	success: [],
	appendSuccess: (msg: string) => {
		set((state) => ({ success: [...state.success, msg] }));
	},
	removeSuccess: (idx: number) => {
		set((state) => ({ success: state.success.filter((_, i) => i !== idx) }));
	},
	removeAllSuccess: () => set({ success: [] }),
}));
