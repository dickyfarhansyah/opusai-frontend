"use client";

import { useSuccess, useRemoveSuccess } from "@/hooks/useSuccess";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function SuccessToaster() {
	const succs = useSuccess();
	const removeSuccess = useRemoveSuccess();
	const processedSuccess = useRef(new Set<number>());

	useEffect(() => {
		succs.forEach((succ, index) => {
			if (!processedSuccess.current.has(index)) {
				processedSuccess.current.add(index);

				toast.success(succ, {
					dismissible: true,
					duration: 2500,
					onDismiss: () => {
						removeSuccess(index);
						processedSuccess.current.delete(index);
					},
				});
			}
		});
		if (succs.length === 0) {
			processedSuccess.current.clear();
		}
	}, [succs, removeSuccess]);

	return null;
}
