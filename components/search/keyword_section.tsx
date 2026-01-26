import { Filter, TagIcon } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { GroupButtonSection } from "./group_button_section";
import { FilterSection } from "./filter_section";

const dummyGroup = [
	{
		name: "Group akta jual beli dummy",
		description: "Some description for this group",
		id: crypto.randomUUID(),
		field_schemas: [
			{
				id: crypto.randomUUID(),
				name: "penjual",
				description: "Some description for penjual field",
			},
			{
				id: crypto.randomUUID(),
				name: "pembeli",
				description: "Some description for pembeli field",
			},
			{
				id: crypto.randomUUID(),
				name: "notaris",
				description: "Some description for notaris field",
			},
		],
	},
	{
		name: "Group undang undang dummy",
		description: "Some description for this group undang undang",
		id: crypto.randomUUID(),
		field_schemas: [
			{
				id: crypto.randomUUID(),
				name: "judul",
				description: "Some description for judul field",
			},
			{
				id: crypto.randomUUID(),
				name: "penerbit",
				description: "Some description for penerbit field",
			},
			{
				id: crypto.randomUUID(),
				name: "tahun",
				description: "Some description for tahun field",
			},
		],
	},
];

export function KeywordSection() {
	const [selectedGroup, setSelectedGroup] = useState<string>(dummyGroup[0].id);
	return (
		<Accordion
			type="single"
			collapsible
			className="w-full"
			defaultValue="keyword-section-1"
		>
			<AccordionItem value="keyword-section-1">
				<AccordionTrigger>Available keywords & filters</AccordionTrigger>
				<AccordionContent className="flex flex-col md:grid md:grid-cols-4 gap-4">
					<div className="md:col-span-2 bg-card h-48 rounded-lg border flex flex-col">
						<div className="border-b p-3 shrink-0">
							<div className="flex items-center gap-2">
								<TagIcon className="h-4 w-4" />
								<h1>Keywords</h1>
							</div>
						</div>
						<div className="flex-1 overflow-hidden">
							<ScrollArea className="h-full w-full">
								<GroupButtonSection
									groups={dummyGroup}
									display={selectedGroup}
									onChangeDisplay={setSelectedGroup}
								/>
							</ScrollArea>
						</div>
					</div>
					<div className="flex flex-col md:col-span-2 bg-card h-48 rounded-lg border">
						<div className="border-b p-3 shrink-0">
							<div className="flex items-center gap-2">
								<Filter className="h-4 w-4" />
								<h1>Keyword filters</h1>
							</div>
						</div>
						<div className="flex-1 overflow-hidden">
							<ScrollArea className="h-full w-full">
								<FilterSection
									groups={dummyGroup}
									selectedGroup={selectedGroup}
								/>
							</ScrollArea>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
