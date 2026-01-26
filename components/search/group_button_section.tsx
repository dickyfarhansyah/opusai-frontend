import { memo } from "react";
import { Button } from "../ui/button";

const GroupButtonSection = memo(function GroupButtonSection({
	groups,
	display,
	onChangeDisplay,
}: {
	groups: {
		name: string;
		description: string;
		id: string;
		field_schemas: { id: string; name: string; description: string }[];
	}[];
	display: string;
	onChangeDisplay: (id: string) => void;
}) {
	return (
		<div className="flex flex-col gap-2 p-4">
			{groups.map((e) => (
				<Button
					className={
						display === e.id ? "bg-accent/60 text-accent-foreground" : ""
					}
					key={e.id}
					variant="outline"
					onClick={() => onChangeDisplay(e.id)}
				>
					{e.name}
				</Button>
			))}
		</div>
	);
});

export { GroupButtonSection };
