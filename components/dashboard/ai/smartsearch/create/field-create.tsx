import { Button } from "@/components/ui/button";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
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
import { FieldType, FieldTypeValue } from "@/lib/type/smartsearch";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import React, { memo } from "react";

interface SchemaFieldCardProps extends React.HTMLAttributes<HTMLDivElement> {
	onRemove?: () => void;
}

const SchemaFieldCard = memo(function SchemaFieldCard({
	className,
	// onRemove,
	...props
}: SchemaFieldCardProps) {
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
				// onClick={onRemove}
			>
				<XIcon className="h-4 w-4" />
			</Button>
			<div className="flex flex-col gap-2">
				<div className="grid grid-cols-4 gap-2">
					<div className="col-span-2">
						<div className="flex flex-col gap-2">
							<Label htmlFor="field-name" className="text-xs">
								Field Name
							</Label>
							<InputGroup>
								<InputGroupInput id="field-name" className="text-xs" />
							</InputGroup>
						</div>
					</div>
					<div className="col-span-2">
						<div className="flex flex-col gap-2">
							<Label htmlFor="field-type" className="text-xs">
								Field Type
							</Label>
							<Combobox items={FieldTypeValue} id="field-type">
								<ComboboxInput placeholder="Declare a type" />
								<ComboboxContent>
									<ComboboxList>
										{(item: FieldType) => (
											<ComboboxItem
												key={item}
												value={item}
												className={"text-xs"}
											>
												{item}
											</ComboboxItem>
										)}
									</ComboboxList>
								</ComboboxContent>
							</Combobox>
						</div>
					</div>
				</div>
				<Label htmlFor="field-description" className="text-xs">
					Field Description
				</Label>
				<InputGroup>
					<InputGroupTextarea
						id="field-description"
						className="min-h-16 max-h-32 text-xs"
					/>
				</InputGroup>
			</div>
		</div>
	);
});

export { SchemaFieldCard };
