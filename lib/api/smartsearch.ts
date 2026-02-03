// import { BASE_URL } from "../config/constants";
import type {
	FetchSmartSearchSchemaResponse,
	SmartSearchResponse,
} from "../type/smartsearch";

export function fetchSmartSearchSchema(): Promise<FetchSmartSearchSchemaResponse> {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/extraction/schema`;
	console.log("am i running?");
	return fetch(url, { method: "GET" })
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Failed to fetch search schema ${res.status}`);
			}
			return res.json();
		})
		.then((data: FetchSmartSearchSchemaResponse) => {
			return data;
		})
		.catch((error) => {
			console.error("Error when fetching search schema", error);
			throw error;
		});
}

export function smartSearch(
	search_query: string,
): Promise<SmartSearchResponse> {
	const params = new URLSearchParams({
		query: search_query,
	});
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?${params}`;

	return fetch(url, {
		method: "GET",
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Failed to search ${res.status}`);
			}
			return res.json();
		})
		.then((data: SmartSearchResponse) => {
			return data;
		})
		.catch((err) => {
			console.error("Failed to search", err);
			throw err;
		});
}
