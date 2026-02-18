import { memo, MouseEvent, useCallback } from "react";
import { SchemaGroupCard } from "./group-create";
import { SchemaFieldCard } from "./field-create";
import { SmartSearchGroupInput } from "@/lib/type/smartsearch";
import { Button } from "@/components/ui/button";
import {
	useSmartSearchSchemaCreateField,
	useSmartSearchSchemaDeleteGroup,
	useSmartSearchSchemaSave,
} from "@/hooks/useSmartsearch";
import { PlusIcon } from "lucide-react";
import { GroupSchemaValidation } from "@/lib/validator/smartsearch-schema/create";
import { useAppendError } from "@/hooks/useError";
import z from "zod";

const SchemaWrapper = memo(function SchemaWrapper({
	group,
}: {
	group: SmartSearchGroupInput;
}) {
	const createField = useSmartSearchSchemaCreateField();
	const saveSchema = useSmartSearchSchemaSave();
	const deleteGroup = useSmartSearchSchemaDeleteGroup();
	const appendError = useAppendError();

	const createFieldHandler = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			createField(group.id);
		},
		[createField, group.id],
	);

	const clearHandler = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			deleteGroup(group.id);
		},
		[deleteGroup, group.id],
	);

	const saveHandler = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			const result = GroupSchemaValidation.safeParse(group);

			if (!result.success) {
				const error = result.error.issues;
				error.forEach((err) => {
					appendError(`Field ${err.path} - ${err.message}`);
				});
				return;
			}

			saveSchema(group);
		},
		[saveSchema, group, appendError],
	);
	return (
		<div className="flex flex-col gap-2 p-2">
			<SchemaGroupCard group={group} />
			{group.fields && (
				<div className="flex flex-col gap-2 ml-8">
					{group.fields.map((field) => (
						<SchemaFieldCard key={field.id} groupId={group.id} field={field} />
					))}
				</div>
			)}
			<div className="flex flex-col gap-4">
				<div className="flex self-end">
					<Button
						variant={"ghost"}
						size={"sm"}
						className="text-xs"
						onClick={createFieldHandler}
					>
						<PlusIcon className="h-4 w-4" /> Add new field
					</Button>
				</div>
				<div className="flex self-end gap-2">
					<Button variant={"outline"} className="text-xs" onClick={saveHandler}>
						Save
					</Button>
					<Button
						variant={"destructive"}
						className="text-xs"
						onClick={clearHandler}
					>
						Clear
					</Button>
				</div>
			</div>
		</div>
	);
});

export { SchemaWrapper };
