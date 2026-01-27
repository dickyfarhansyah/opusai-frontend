import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SearchEngineHit } from "./type/smartsearch";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDynamicFields(hit: SearchEngineHit) {
	const knownKeys: (keyof SearchEngineHit)[] = [
		"id_primaryKey",
		"id_PrimaryKey",
		"grup",
	];
	return Object.entries(hit).filter(([key]) => !knownKeys.includes(key));
}
