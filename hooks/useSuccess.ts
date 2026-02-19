import { successStore } from "@/lib/store/success_store";

export function useSuccess() {
	return successStore((state) => state.success);
}

export function useAppendSuccess() {
	return successStore((state) => state.appendSuccess);
}

export function useRemoveSuccess() {
	return successStore((state) => state.removeSuccess);
}

export function useRemoveAllSuccess() {
	return successStore((state) => state.removeAllSuccess);
}
