import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
	useGetFiles,
	useIsProcessing,
	useIsThinking,
	useRemoveFile,
} from "@/hooks/useChat";
import { FileIcon, XIcon } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { UserFileReferenceModal } from "./file_reference";

export function ChatFileContainer() {
	const files = useGetFiles();
	const removeFile = useRemoveFile();
	const isProcessing = useIsProcessing();
	const rendered_card_files = useMemo(() => {
		return files.map((file, index) => (
			<ChatFileCard
				key={`file-${crypto.randomUUID()}`}
				index={index}
				delete_handler={() => removeFile(index)}
				file={file}
			/>
		));
	}, [files, removeFile]);
	return (
		<div className="flex flex-row mx-auto max-w-3xl px-2 items-center">
			{rendered_card_files}
			{rendered_card_files.length > 0 && isProcessing ? (
				<Spinner className="h-4 w-4" />
			) : null}
		</div>
	);
}

const ChatFileCard = memo(function ChatFileCard({
	index,
	file,
	delete_handler,
}: {
	index: number;
	file: File;
	delete_handler: (index: number) => void;
}) {
	const [open, onOpenChange] = useState(false);
	// const [fileUrlState, setFileUrlState] = useState("");
	const isThinking = useIsThinking();
	const handleOpenFile = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).closest('button[aria-label="delete"]')) {
			return;
		}

		if (file.type === "application/pdf" || file.type === "text/plain") {
			onOpenChange(true);
			// setFileUrlState(fileUrl);
		} else {
			const fileUrl = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.href = fileUrl;
			link.download = file.name;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setTimeout(() => URL.revokeObjectURL(fileUrl), 100);
		}
	};

	return (
		<>
			<div className="flex h-6 w-32 rounded-xl mx-1 bg-linear-to-r from-accent to-transparent ">
				{/* 
					biome-ignore lint/a11y/useKeyWithClickEvents: tech debt 
					biome-ignore lint/a11y/noStaticElementInteractions: tech debt 
					*/}
				<span
					className="text-sm line-clamp-1 px-1 cursor-pointer"
					onClick={handleOpenFile}
				>
					{file.name}
				</span>
				<Button
					disabled={isThinking}
					variant="ghost"
					size="icon-sm"
					className="rounded-full h-4 w-4 mx-1 my-1 cursor-pointer hover:bg-accent-foreground hover:text-accent"
					onClick={() => delete_handler(index)}
				>
					<XIcon size={12} />
				</Button>
			</div>
			{open && (
				<UserFileReferenceModal
					file={file}
					open={open}
					onOpenChange={onOpenChange}
				/>
			)}
		</>
	);
});

export const UserChatFile = memo(function UserChatFile({
	file,
}: {
	file: File;
}) {
	const [open, onOpenChange] = useState(false);
	const clickHandler = () => {
		onOpenChange(true);
	};
	return (
		<>
			<Button
				className="h-14 max-w-48 w-fit rounded-lg hover:bg-none text-sm cursor-pointer truncate"
				variant={"outline"}
				size={"sm"}
				onClick={clickHandler}
			>
				<div className="flex items-center gap-2 min-w-0 w-full">
					<FileIcon className="h-8 w-8 shrink-0" />
					<div className="truncate">{file.name}</div>
				</div>
			</Button>
			{open && (
				<UserFileReferenceModal
					file={file}
					open={open}
					onOpenChange={onOpenChange}
				/>
			)}
		</>
	);
});
