import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupInput,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
	useSmartSearchSchemaClearGroupError,
	useSmartSearchSchemaDeleteGroup,
	useSmartSearchSchemaErrors,
	useSmartSearchSchemaGetGroupErrors,
	useSmartSearchSchemaGetIsSaving,
	useSmartSearchSchemaSetGroupError,
	useSmartSearchSchemaUpdateGroup,
} from "@/hooks/useSmartsearch";
import type { SmartSearchGroupInput } from "@/lib/type/smartsearch";
import { GroupSchemaValidation } from "@/lib/validator/smartsearch-schema/create";
import { XIcon } from "lucide-react";
import { ChangeEvent, memo, useCallback } from "react";

const SchemaGroupCard = memo(
	function SchemaGroupCard({ group }: { group: SmartSearchGroupInput }) {
		const updateGroup = useSmartSearchSchemaUpdateGroup();
		const deleteGroup = useSmartSearchSchemaDeleteGroup();
		const setGroupError = useSmartSearchSchemaSetGroupError();
		const clearGroupError = useSmartSearchSchemaClearGroupError();
		const groupErrors = useSmartSearchSchemaGetGroupErrors(group.id);
		const isSaving = useSmartSearchSchemaGetIsSaving();

		const updateDescriptionCallback = useCallback(
			(e: ChangeEvent<HTMLTextAreaElement>) => {
				const value = e.target.value;

				// Update state
				updateGroup(group.id, { description: value });

				// Validate
				const DescriptionSchema = GroupSchemaValidation.pick({
					description: true,
				});
				const result = DescriptionSchema.safeParse({ description: value });

				if (!result.success) {
					setGroupError(
						group.id,
						"description",
						result.error.issues[0]?.message || "Invalid description",
					);
				} else {
					clearGroupError(group.id, "description");
				}
			},
			[group.id, updateGroup, setGroupError, clearGroupError],
		);

		const updateNameCallback = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				const value = e.target.value;
				updateGroup(group.id, { name: value });

				// Validate immediately
				const NameSchema = GroupSchemaValidation.pick({ name: true });
				const result = NameSchema.safeParse({ name: value });

				if (!result.success) {
					setGroupError(group.id, "name", result.error.issues[0].message);
				} else {
					clearGroupError(group.id, "name");
				}
			},
			[group.id, updateGroup, setGroupError, clearGroupError],
		);

		const deleteCallback = useCallback(() => {
			deleteGroup(group.id);
		}, [group.id, deleteGroup]);

		return (
			<div className="relative flex flex-col gap-2 p-4 rounded-lg border">
				<Button
					size={"icon-sm"}
					variant={"ghost"}
					className="absolute top-1 right-2"
					onClick={deleteCallback}
					disabled={isSaving}
				>
					<XIcon className="h-4 w-4" />
				</Button>
				<Label htmlFor={`group-name-${group.id}`} className="text-xs">
					Group Name
				</Label>
				<InputGroup>
					<InputGroupInput
						id={`group-name-${group.id}`}
						className={`text-xs ${groupErrors?.name ? "border-destructive" : ""}`}
						value={group.name}
						onChange={updateNameCallback}
						disabled={isSaving}
					/>
				</InputGroup>
				{groupErrors?.name && (
					<span className="text-xs text-destructive -mt-1 ml-1">
						{groupErrors.name}
					</span>
				)}
				<Label htmlFor={`group-description-${group.id}`} className="text-xs">
					Group Description
				</Label>
				<InputGroup>
					<InputGroupTextarea
						id={`group-description-${group.id}`}
						className="min-h-16 max-h-32 text-xs"
						value={group.description}
						onChange={updateDescriptionCallback}
						disabled={isSaving}
					/>
				</InputGroup>
				{groupErrors?.description && (
					<span className="text-xs text-destructive -mt-1 ml-1">
						{groupErrors.description}
					</span>
				)}
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.group.id === nextProps.group.id &&
			prevProps.group.name === nextProps.group.name &&
			prevProps.group.description === nextProps.group.description
		);
	},
);

export { SchemaGroupCard };
