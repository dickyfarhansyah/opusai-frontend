import { SearchIcon } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";

export function SearchInputBox() {
	return (
		<InputGroup className="flex-1">
			<InputGroupInput placeholder="Type in your language to search..." />
			<InputGroupAddon align={"inline-end"}>
				<InputGroupButton variant={"ghost"} size={"icon-sm"}>
					<SearchIcon />
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}
