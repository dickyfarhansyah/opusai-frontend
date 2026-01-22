import { BASE_URL } from "../config/constants";

interface ChunkResponseSchema {
	id: string;
	content: string;
	doc_id: string;
	file_name: string;
	file_path: string;
	created_at: string;
}

export function fetchChunk(chunkId: string) {
	const url = `${BASE_URL}api/vectors/parents/${chunkId}`;
	return fetch(url, {
		method: "GET",
	})
		.then((resp) => {
			if (!resp.ok) {
				throw new Error(`FAILED TO FETCH REFERENCE`);
			}
			return resp.json();
		})
		.then((data: ChunkResponseSchema) => {
			return data;
		})
		.catch((error) => {
			console.error(`Error fetching chunk with id ${chunkId}: ${error}`);
			throw error;
		});
}
