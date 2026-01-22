import { Filter, TagIcon } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export function KeywordSection() {
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
								<div className="flex flex-col gap-2 p-4">
									<Button>Badut</Button>
									<Button>Badut</Button>
									<Button>Badut</Button>
									<Button>Badut</Button>
									<Button>Badut</Button>
									<Button>Badut</Button>
								</div>
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
								<div className="flex flex-col gap-2 p-4">
									<div>test field</div>
									<div>test field</div>
									<div>test field</div>
									<div>test field</div>
									<div>test field</div>
									<div>test field</div>
									<div>test field</div>
								</div>
							</ScrollArea>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
