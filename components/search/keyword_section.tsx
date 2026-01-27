"use client";

import { Filter, TagIcon } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { GroupButtonSection } from "./group_button_section";
import { FilterSection } from "./filter_section";
import { useFetchSchema } from "@/hooks/useSmartsearch";
import { Spinner } from "../ui/spinner";

export function KeywordSection() {
	// const [selectedGroup, setSelectedGroup] = useState<string>(dummyGroup[0].id);
	const { schemas, isLoading, isError } = useFetchSchema();
	const [selectedGroup, setSelectedGroup] = useState<string>("");

	useEffect(() => {
		if (schemas.schemas.length > 0 && !selectedGroup) {
			setSelectedGroup(schemas.schemas[0].id);
		}
	}, [selectedGroup, schemas]);

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
								{isLoading || isError ? (
									<div className="flex flex-col items-center justify-center">
										<Spinner />
									</div>
								) : (
									<GroupButtonSection
										groups={schemas}
										display={selectedGroup}
										onChangeDisplay={setSelectedGroup}
									/>
								)}
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
								{isLoading || isError ? (
									<div className="flex flex-col items-center justify-center">
										<Spinner />
									</div>
								) : (
									<FilterSection
										groups={schemas}
										selectedGroup={selectedGroup}
									/>
								)}
							</ScrollArea>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
