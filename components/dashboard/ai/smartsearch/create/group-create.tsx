import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupInput,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import { memo } from "react";

const SchemaGroupCard = memo(function SchemaGroupCard() {
	return (
		<div className="relative flex flex-col gap-2 p-4 rounded-lg border">
			<Button
				size={"icon-sm"}
				variant={"ghost"}
				className="absolute top-1 right-2"
			>
				<XIcon className="h-4 w-4" />
			</Button>
			<Label htmlFor="group-name" className="text-xs">
				Group Name
			</Label>
			<InputGroup>
				<InputGroupInput id="group-name" className="text-xs" />
			</InputGroup>
			<Label htmlFor="group-description" className="text-xs">
				Group Description
			</Label>
			<InputGroup>
				<InputGroupTextarea
					id="group-description"
					className="min-h-16 max-h-32 text-xs"
				/>
			</InputGroup>
		</div>
	);
});

export { SchemaGroupCard };
