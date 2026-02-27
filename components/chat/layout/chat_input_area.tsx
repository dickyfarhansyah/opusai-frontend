// 'use client'

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { SendIcon, X, XIcon } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useIsThinking, useSendMessage } from "@/hooks/useChat";
import useDebounce from "@/hooks/useDebounce";
// import {redirect, RedirectType, usePathname, useRouter} from "next/navigation"
import { ChatModelSwitch } from "../input/model_switch";
import { ChatFileUpload } from "../input/file_upload";
import { ChatPromptSwitch } from "../input/prompt_switch";
import { ChatFileContainer } from "../files/files";
import { Separator } from "@/components/ui/separator";
import { ChatParameterSettings } from "../input/parameter_settings";
import { KnowledgeBaseInputToggle } from "../input/knowledge_base_toggle";

export default function ChatInputArea({
	isRedirect = true,
}: {
	isRedirect?: boolean;
}) {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 500);
	const sendMessage = useSendMessage();
	const isThinking = useIsThinking();
	const queryRef = useRef("");
	// const router = useRouter()
	// const pathname = usePathname()

	function handle_send_message() {
		if (!query || isThinking) return;

		queryRef.current = "";

		queryRef.current = query;
		setQuery("");
		sendMessage(queryRef.current);
	}
	async function prevent_default_enter(e: KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handle_send_message();
		}
	}

	return (
		// <div className="p-2 md:h-46 lg:h-46">
		<div className="p-2 pt-4 md:pb-8 pb-14 bg-linear-to-t from-background from-85% to-transparent">
			<div className="h-6 mb-1.5">
				<ChatFileContainer />
			</div>
			<div className="flex gap-1 mx-auto max-w-3xl items-end">
				<InputGroup className="rounded-2xl">
					<InputGroupTextarea
						id="user-query"
						value={query}
						className="min-h-8 max-h-26 resize-none"
						placeholder="Asks your question..."
						onKeyDown={prevent_default_enter}
						onChange={(e) => setQuery(e.target.value)}
						disabled={isThinking}
					/>
					<InputGroupAddon
						align="block-end"
						className="flex items-center justify-between w-full gap-2"
					>
						{/* <div className="flex items-center h-4 md:gap-2"> */}
						<div className="flex items-center h-8 md:gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide flex-nowrap flex-1 min-w-0">
							<ChatFileUpload />
							<Separator orientation="vertical" className="h-4" />
							<ChatModelSwitch />
							<Separator orientation="vertical" className="h-4" />
							<ChatPromptSwitch />
							<Separator orientation="vertical" className="h-4" />
							<ChatParameterSettings />
							<Separator orientation="vertical" className="h-4" />
							<KnowledgeBaseInputToggle />
						</div>

						<InputGroupButton
							aria-label="send question"
							title="Send"
							className="ml-auto"
							disabled={debouncedQuery === "" || isThinking}
							onClick={handle_send_message}
						>
							<SendIcon />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>
		</div>
	);
}
