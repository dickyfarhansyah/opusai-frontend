import { FieldTypeValue } from "@/lib/type/smartsearch";
import z from "zod";

export const FieldSchemaValidation = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	description: z.string().min(1),
	type: z.enum(FieldTypeValue),
});

export const GroupSchemaValidation = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	description: z.string().min(1),
	fields: z.array(FieldSchemaValidation).min(1),
});

export type TypeGroupSchemaValidation = z.infer<typeof GroupSchemaValidation>;
export type TypeFieldSchemaValidation = z.infer<typeof FieldSchemaValidation>;
