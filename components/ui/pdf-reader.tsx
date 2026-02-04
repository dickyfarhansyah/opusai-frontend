import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./dialog";

function PDFViewer({ file }: { file: File }) {
	// const [fileUrl, setFileUrl] = useState<string>("");
	// const [fileName, setFileName] = useState<string>("");
	const fileUrl = useMemo(() => URL.createObjectURL(file), [file]);
	useEffect(() => {
		return () => {
			URL.revokeObjectURL(fileUrl);
		};
	}, [fileUrl]);
	return (
		<div className="h-full w-full">
			<iframe src={fileUrl} className="w-full h-full" title={file.name} />
		</div>
	);
}

function PDFModal({
	file,
	open,
	onOpenChange,
}: {
	file?: File;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const fileName = file ? file.name : "";

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex flex-col h-6/12 lg:h-10/12">
				<DialogTitle className="text-xl h-fit">{fileName}</DialogTitle>
				<div className="flex-1 flex">
					{file ? <PDFViewer file={file} /> : "No file!"}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export { PDFViewer, PDFModal };
