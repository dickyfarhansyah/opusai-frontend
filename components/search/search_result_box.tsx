/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <meilisearch marks> */
/** biome-ignore-all lint/security/noDangerouslySetInnerHtmlWithChildren: <meilisearch marks> */
import { useGetSearchHits } from "@/hooks/useSmartsearch";
import { getDynamicFields } from "@/lib/utils";
import { useMemo } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function EmptyResultBox({ text }: { text?: string }) {
	return (
		<div className="h-96">
			<div className="flex flex-col p-8 rounded-xl border-2 border-dashed items-center justify-center w-full h-full">
				<h1 className="text-xl text-muted-foreground text-balance">
					{text || "Search results will appear here"}
				</h1>
			</div>
		</div>
	);
}

export function ResultBox() {
	const hits = useGetSearchHits();
	const memoizedHits = useMemo(
		() =>
			hits.map((e) => {
				const dynamicFields = getDynamicFields(e._formatted);

				return (
					<div
						key={e._formatted.id_primaryKey}
						className="flex flex-col rounded-lg p-4 border bg-muted"
					>
						<h4
							className="text-lg"
							dangerouslySetInnerHTML={{ __html: e._formatted.grup }}
						/>
						{dynamicFields.map(([key, value]) => (
							<p
								key={crypto.randomUUID()}
								className="text-xs text-balance"
								dangerouslySetInnerHTML={{ __html: `${key}: ${String(value)}` }}
							/>
						))}
					</div>
				);
			}),
		[hits],
	);

	return (
		<div className="h-96">
			{hits.length > 0 ? (
				<ScrollArea className="h-full w-full">
					<div className="flex flex-col space-y-4 p-4">{memoizedHits}</div>
				</ScrollArea>
			) : (
				<EmptyResultBox text="No files matched!" />
			)}
		</div>
	);
}
