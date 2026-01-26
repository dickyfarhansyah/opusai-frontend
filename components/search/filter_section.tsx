import { memo, useMemo } from "react";

const FilterSection = memo(function FilterSection({
	groups,
	selectedGroup,
}: {
	groups: {
		name: string;
		description: string;
		id: string;
		field_schemas: { id: string; name: string; description: string }[];
	}[];
	selectedGroup: string;
}) {
	const selectedFieldSchemas = useMemo(() => {
		return groups.find((e) => e.id === selectedGroup)?.field_schemas;
	}, [groups, selectedGroup]);
	return (
		<div className="flex flex-col gap-2 p-4">
			{selectedFieldSchemas ? (
				selectedFieldSchemas.map((e) => (
					<div key={e.id}>
						<h4 className="text-base font-semibold capitalize">{e.name}</h4>
						<p className="text-sm font-light">{e.description}</p>
					</div>
				))
			) : (
				<h4 className="text-base font-semibold">No filters available</h4>
			)}
		</div>
	);
});

export { FilterSection };
