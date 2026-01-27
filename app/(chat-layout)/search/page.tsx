"use client";

import {
	EmptyResultBox,
	GuideModal,
	KeywordSection,
	ResultBox,
	SearchInputBox,
} from "@/components/search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetIsSearching, useGetSearchHits } from "@/hooks/useSmartsearch";

export default function SearchPage() {
	const isSearching = useGetIsSearching();
	const hits = useGetSearchHits();
	return (
		<ScrollArea className="h-full">
			<div className="flex flex-col gap-4 py-4 w-xs md:w-lg lg:w-2xl xl:w-4xl mx-auto h-full">
				<header className="flex flex-col rounded-lg p-4 gap-2 border">
					<div className="flex flex-row gap-2 items-center">
						<h1 className="text-2xl">Search</h1>
						<GuideModal />
					</div>
					<Separator orientation="horizontal" />
					<KeywordSection />
				</header>
				<div className="flex rounded-lg border px-4 py-4 items-center">
					<div className="flex flex-col w-full gap-y-2">
						<SearchInputBox />
						<p className="text-xs text-muted-foreground">
							Type naturally, let our AI extract the keyword and filters.
						</p>
					</div>
				</div>
				<div className="flex p-4 rounded-lg border min-h-64 max-h-128">
					<ScrollArea className="flex min-w-full min-h-full">
						{hits.length > 0 ? <ResultBox /> : <EmptyResultBox />}
					</ScrollArea>
				</div>
			</div>
		</ScrollArea>
	);
}
