import { memo, MouseEvent, useCallback } from "react";
import { SchemaGroupCard } from "./group-create";
import { SchemaFieldCard } from "./field-create";
import { SmartSearchGroupInput } from "@/lib/type/smartsearch";
import { Button } from "@/components/ui/button";
import {
	useSmartSearchSchemaCreateField,
	useSmartSearchSchemaDeleteGroup,
	useSmartSearchSchemaGetIsSaving,
	useSmartSearchSchemaSave,
	useSmartSearchSchemaSetIsSaving,
} from "@/hooks/useSmartsearch";
import { PlusIcon } from "lucide-react";
import { GroupSchemaValidation } from "@/lib/validator/smartsearch-schema/create";
import { useAppendError } from "@/hooks/useError";
import { Spinner } from "@/components/ui/spinner";
import { useAppendSuccess } from "@/hooks/useSuccess";

const SchemaWrapper = memo(function SchemaWrapper({
	group,
}: {
	group: SmartSearchGroupInput;
}) {
	const createField = useSmartSearchSchemaCreateField();
	const saveSchema = useSmartSearchSchemaSave();
	const deleteGroup = useSmartSearchSchemaDeleteGroup();
	const appendError = useAppendError();
	const isSaving = useSmartSearchSchemaGetIsSaving();
	const setIsSaving = useSmartSearchSchemaSetIsSaving();
	const appendSuccess = useAppendSuccess();

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
		async (e: MouseEvent<HTMLButtonElement>) => {
			const result = GroupSchemaValidation.safeParse(group);

			if (isSaving) {
				appendError("Wait until the first group is saved!");
				return;
			}

			if (!result.success) {
				const error = result.error.issues;
				error.forEach((err) => {
					appendError(`Field ${err.path} - ${err.message}`);
				});
				return;
			}

			setIsSaving(true);
			const resultMessage = await saveSchema(group.id);
			appendSuccess(resultMessage);
		},
		[saveSchema, group, appendError, setIsSaving, isSaving, appendSuccess],
	);
	return (
		<div className="flex flex-col gap-2 p-2 relative">
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
						disabled={isSaving}
					>
						<PlusIcon className="h-4 w-4" /> Add new field
					</Button>
				</div>
				<div className="flex self-end gap-2">
					<Button
						variant={"outline"}
						className="text-xs"
						onClick={saveHandler}
						disabled={isSaving}
					>
						Save
					</Button>
					<Button
						variant={"destructive"}
						className="text-xs"
						onClick={clearHandler}
						disabled={isSaving}
					>
						Clear
					</Button>
				</div>
			</div>
			{isSaving && (
				<div className="absolute inset-0 backdrop-blur-xs flex items-center justify-center z-50 rounded-lg">
					<div className="flex flex-col items-center gap-2">
						<Spinner className="h-16 w-16" />
						<span className="text-sm font-medium text-muted-foreground">
							Saving...
						</span>
					</div>
				</div>
			)}
		</div>
	);
});

export { SchemaWrapper };
