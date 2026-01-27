import { create } from "zustand";
import { smartSearch } from "../api/smartsearch";
import type { SearchEngineHits } from "../type/smartsearch";

interface SmartsearchStoreState {
	hits: SearchEngineHits[];
	isSearching: boolean;
	search: (search_query: string) => Promise<void>;
	setIsSearching: (value: boolean) => void;
}

export const smartSearchStore = create<SmartsearchStoreState>((set, get) => ({
	hits: [],
	isSearching: false,
	search: async (search_query: string) => {
		if (!search_query) return;

		get().setIsSearching(true);
		try {
			const data = await smartSearch(search_query);
			console.log(data);
			set({ hits: data.hits });
		} catch (err) {
			console.error("Cannot perform smart search", err);
		} finally {
			get().setIsSearching(false);
		}
	},
	setIsSearching: (value: boolean) => set({ isSearching: value }),
}));
