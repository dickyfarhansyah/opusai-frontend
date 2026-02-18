import { fetchSmartSearchSchema } from "@/lib/api/smartsearch";
import type { FetchSmartSearchSchemaResponse } from "@/lib/type/smartsearch";
import { useEffect, useState } from "react";
import { useAppendError } from "./useError";
import {
	smartSearchSchemaCreateStore,
	smartSearchSchemaStore,
	smartSearchStore,
} from "@/lib/store/smartsearch_store";

export function useFetchSchema() {
	const [schemas, setSchemas] = useState<FetchSmartSearchSchemaResponse>({
		schemas: [],
	});
	const [loading, setIsLoading] = useState(false);
	const [error, setIsError] = useState(false);
	const appendError = useAppendError();

	useEffect(() => {
		const fetcher = async () => {
			try {
				setIsLoading(true);
				const data = await fetchSmartSearchSchema();
				setSchemas(data);
			} catch (err) {
				setIsError(true);
				appendError(
					err instanceof Error ? err.message : "Failed to fetch search schemas",
				);
			} finally {
				setIsLoading(false);
			}
		};
		fetcher();
	}, [appendError]);

	return {
		schemas,
		isLoading: loading,
		isError: error,
	};
}

export function useSmartSearch() {
	return smartSearchStore((state) => state.search);
}

export function useGetSearchHits() {
	return smartSearchStore((state) => state.hits);
}

export function useGetIsSearching() {
	return smartSearchStore((state) => state.isSearching);
}

export function useGetSetIsSearching() {
	return smartSearchStore((state) => state.setIsSearching);
}

export function useSmartSearchSchemas() {
	return smartSearchSchemaStore((state) => state.schemas);
}

export function useLoadSmartSearchSchemas() {
	return smartSearchSchemaStore((state) => state.loadSchemas);
}

export function useSmartSearchSchemaGroups() {
	return smartSearchSchemaCreateStore((state) => state.groups);
}

export function useSmartSearchSchemaCreateGroup() {
	return smartSearchSchemaCreateStore((state) => state.createGroup);
}

export function useSmartSearchSchemaUpdateGroup() {
	return smartSearchSchemaCreateStore((state) => state.updateGroup);
}

export function useSmartSearchSchemaDeleteGroup() {
	return smartSearchSchemaCreateStore((state) => state.deleteGroup);
}

export function useSmartSearchSchemaCreateField() {
	return smartSearchSchemaCreateStore((state) => state.createField);
}

export function useSmartSearchSchemaUpdateField() {
	return smartSearchSchemaCreateStore((state) => state.updateField);
}

export function useSmartSearchSchemaDeleteField() {
	return smartSearchSchemaCreateStore((state) => state.deleteField);
}

export function useSmartSearchSchemaSave() {
	return smartSearchSchemaCreateStore((state) => state.saveSchema);
}

export function useSmartSearchSchemaErrors() {
	return smartSearchSchemaCreateStore((state) => state.errors);
}

export function useSmartSearchSchemaSetGroupError() {
	return smartSearchSchemaCreateStore((state) => state.setGroupError);
}

export function useSmartSearchSchemaClearGroupError() {
	return smartSearchSchemaCreateStore((state) => state.clearGroupError);
}

export function useSmartSearchSchemaClearGroupErrors() {
	return smartSearchSchemaCreateStore((state) => state.clearGroupErrors);
}

export function useSmartSearchSchemaSetFieldError() {
	return smartSearchSchemaCreateStore((state) => state.setFieldError);
}

export function useSmartSearchSchemaClearFieldError() {
	return smartSearchSchemaCreateStore((state) => state.clearFieldError);
}

export function useSmartSearchSchemaValidateGroup() {
	return smartSearchSchemaCreateStore((state) => state.validateGroup);
}

export function useSmartSearchSchemaValidateField() {
	return smartSearchSchemaCreateStore((state) => state.validateField);
}

export function useSmartSearchSchemaValidateAll() {
	return smartSearchSchemaCreateStore((state) => state.validateAll);
}

export function useSmartSearchSchemaGetGroupErrors(groupId: string) {
	return smartSearchSchemaCreateStore((state) => state.getGroupErrors(groupId));
}

export function useSmartSearchSchemaGetFieldErrors(
	groupId: string,
	fieldId: string,
) {
	return smartSearchSchemaCreateStore((state) =>
		state.getFieldErrors(groupId, fieldId),
	);
}
