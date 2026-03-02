import { Button } from "@/components/ui/button";
import {
	Combobox,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import {
	InputGroup,
	InputGroupInput,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
	useSmartSearchSchemaClearFieldError,
	useSmartSearchSchemaDeleteField,
	useSmartSearchSchemaGetFieldErrors,
	useSmartSearchSchemaGetIsSaving,
	useSmartSearchSchemaSetFieldError,
	useSmartSearchSchemaUpdateField,
} from "@/hooks/useSmartsearch";
import {
	FieldType,
	FieldTypeValue,
	SmartSearchFieldInput,
} from "@/lib/type/smartsearch";
import { cn } from "@/lib/utils";
import { FieldSchemaValidation } from "@/lib/validator/smartsearch-schema/create";
import { XIcon } from "lucide-react";
import React, { ChangeEvent, memo, MouseEvent, useCallback } from "react";

interface SchemaFieldCardProps extends React.HTMLAttributes<HTMLDivElement> {
	groupId: string;
	field: SmartSearchFieldInput;
}

const SchemaFieldCard = memo(
	function SchemaFieldCard({
		groupId,
		field,
		className,
		...props
	}: SchemaFieldCardProps) {
		const updateField = useSmartSearchSchemaUpdateField();
		const deleteField = useSmartSearchSchemaDeleteField();
		const setFieldError = useSmartSearchSchemaSetFieldError();
		const clearFieldError = useSmartSearchSchemaClearFieldError();
		const fieldErrors = useSmartSearchSchemaGetFieldErrors(groupId, field.id);
		const isSaving = useSmartSearchSchemaGetIsSaving();

		const updateFieldNameCallback = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				const value = e.target.value;

				updateField(groupId, field.id, { name: e.target.value });

				const NameSchema = FieldSchemaValidation.pick({
					name: true,
				});

				const result = NameSchema.safeParse({ name: value });

				if (!result.success) {
					setFieldError(
						groupId,
						field.id,
						"name",
						result.error.issues[0]?.message || "Name must not be empty",
					);
				} else {
					clearFieldError(groupId, field.id, "name");
				}
			},
			[updateField, field.id, groupId, setFieldError, clearFieldError],
		);

		const updateFieldTypeCallback = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				const value = e.target.value as FieldType;
				if (FieldTypeValue.includes(value)) {
					updateField(groupId, field.id, { type: value });
				}
				const TypeSchema = FieldSchemaValidation.pick({
					type: true,
				});

				const result = TypeSchema.safeParse({ name: value });

				if (!result.success) {
					setFieldError(
						groupId,
						field.id,
						"type",
						result.error.issues[0]?.message ||
							"Type cannot be empty and must follows given type",
					);
				} else {
					clearFieldError(groupId, field.id, "type");
				}
			},
			[updateField, field.id, groupId, setFieldError, clearFieldError],
		);

		const updateFieldDescriptionCallback = useCallback(
			(e: ChangeEvent<HTMLTextAreaElement>) => {
				const value = e.target.value;
				updateField(groupId, field.id, { description: value });

				const DescriptionSchema = FieldSchemaValidation.pick({
					description: true,
				});

				const result = DescriptionSchema.safeParse({ description: value });

				if (!result.success) {
					setFieldError(
						groupId,
						field.id,
						"description",
						result.error.issues[0]?.message || "Description cannot be empty",
					);
				} else {
					clearFieldError(groupId, field.id, "description");
				}
			},
			[updateField, field.id, groupId, setFieldError, clearFieldError],
		);

		const deleteHandler = useCallback(
			(e: MouseEvent<HTMLButtonElement>) => {
				deleteField(groupId, field.id);
			},
			[groupId, field.id, deleteField],
		);

		return (
			<div
				className={cn([
					"relative flex flex-col gap-2 p-4 rounded-lg border",
					className,
				])}
				{...props}
			>
				<Button
					size={"icon-sm"}
					variant={"ghost"}
					className="absolute top-1 right-2"
					onClick={deleteHandler}
					disabled={isSaving}
				>
					<XIcon className="h-4 w-4" />
				</Button>
				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-4 gap-2">
						<div className="col-span-2">
							<div className="flex flex-col gap-2">
								<Label htmlFor={`field-name-${field.id}`} className="text-xs">
									Field Name
								</Label>
								<InputGroup>
									<InputGroupInput
										id={`field-name-${field.id}`}
										className={`text-xs ${fieldErrors?.name ? "border-destructive" : ""}`}
										onChange={updateFieldNameCallback}
										disabled={isSaving}
									/>
								</InputGroup>
								{fieldErrors?.name && (
									<span className="text-xs text-destructive -mt-1 ml-1">
										{fieldErrors.name}
									</span>
								)}
							</div>
						</div>
						<div className="col-span-2">
							<div className="flex flex-col gap-2">
								<Label htmlFor={`field-type-${field.id}`} className="text-xs">
									Field Type
								</Label>
								<Combobox items={FieldTypeValue} id={`field-type-${field.id}`}>
									<ComboboxInput
										placeholder="Declare a type"
										onChange={updateFieldTypeCallback}
										disabled={isSaving}
									/>
									<ComboboxContent>
										<ComboboxList>
											{(item: FieldType) => (
												<ComboboxItem
													key={item}
													value={item}
													className={`text-xs ${fieldErrors?.type ? "border-destructive" : ""}`}
												>
													{item}
												</ComboboxItem>
											)}
										</ComboboxList>
									</ComboboxContent>
								</Combobox>
								{fieldErrors?.type && (
									<span className="text-xs text-destructive -mt-1 ml-1">
										{fieldErrors.type}
									</span>
								)}
							</div>
						</div>
					</div>
					<Label htmlFor={`field-description-${field.id}`} className="text-xs">
						Field Description
					</Label>
					<InputGroup>
						<InputGroupTextarea
							id={`field-description-${field.id}`}
							className={`text-xs min-h-16 max-h-32 ${fieldErrors?.description ? "border-destructive" : ""}`}
							onChange={updateFieldDescriptionCallback}
							disabled={isSaving}
						/>
					</InputGroup>
					{fieldErrors?.description && (
						<span className="text-xs text-destructive -mt-1 ml-1">
							{fieldErrors.description}
						</span>
					)}
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.groupId === nextProps.groupId &&
			prevProps.field.id === nextProps.field.id &&
			prevProps.field.name === nextProps.field.name &&
			prevProps.field.type === nextProps.field.type &&
			prevProps.field.description === nextProps.field.description
		);
	},
);

export { SchemaFieldCard };
