import { memo, useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";

const CopyButton = memo(function CopyButton({ content }: { content: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<Button
			variant="ghost"
			onClick={handleCopy}
			className="rounded-full h-6 w-6 group-hover:opacity-100 transition-opacity"
		>
			{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
		</Button>
	);
});

export { CopyButton };
