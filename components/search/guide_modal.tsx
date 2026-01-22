import { HelpCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export function GuideModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={"icon-sm"} variant={"ghost"}>
					<HelpCircleIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-xl">How to Use Smart Search</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<h3 className="font-medium mb-2">1. Type naturally</h3>
						<p className="text-sm text-balance">
							Just describe what you are looking for in plain language. Assume
							you are talking to a librarian that could find what you want
						</p>
						<div className="flex flex-col gap-1 bg-muted rounded-lg p-3 mt-2 text-sm font-mono">
							<p className="text-xs">Example:</p>
							<p>"dokumen akta jual beli yang pembeli nya tuan samsul"</p>
						</div>
					</div>

					<div>
						<h3 className="font-medium mb-2">2. Use available keywords</h3>
						<p className="text-sm text-balance">
							Refer to the group listed in keywords section to help our AI to
							understand what document you are looking for.
						</p>
					</div>

					<div>
						<h3 className="font-medium mb-2">3. Filters apply automatically</h3>
						<p className="text-sm text-balance">
							The system will detect any relevant filter based on your search
							query.
						</p>
					</div>

					<div>
						<h3 className="font-medium mb-2">More Examples</h3>
						<ul className="text-sm space-y-1 list-disc list-inside text-balance">
							<li>
								"dokumen akta jual beli dengan harga asset diatas 5 miliar"
							</li>
							<li>
								"dokumen akta jual beli yang alamat asset nya di surabaya jalan
								gombong"
							</li>
							<li>
								"dokumen undang undang yang mengatur tentang peraturan
								pertanahan"
							</li>
						</ul>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"outline"}>Got it!</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
