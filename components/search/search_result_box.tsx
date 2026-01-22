export function EmptyResultBox() {
	return (
		<div className="flex flex-col p-8 rounded-xl border-2 border-dashed items-center justify-center w-full h-full">
			<h1 className="text-xl text-muted-foreground text-balance">
				Search results will appear here
			</h1>
		</div>
	);
}

export function ResultBox() {
	return null;
}
