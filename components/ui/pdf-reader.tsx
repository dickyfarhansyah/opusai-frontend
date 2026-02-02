import { useEffect, useMemo, useState } from "react";

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

export { PDFViewer };
