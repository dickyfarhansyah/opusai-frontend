"use client";

import {
	useGetError,
	useRemoveAllErrors,
	useRemoveError,
} from "@/hooks/useError";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ErrorToaster() {
	const errors = useGetError();
	const removeError = useRemoveError();
	const processedError = useRef(new Set<number>());

	useEffect(() => {
		errors.forEach((error, index) => {
			if (!processedError.current.has(index)) {
				processedError.current.add(index);

				toast.error(error, {
					dismissible: true,
					duration: 2500,
					onDismiss: () => {
						removeError(index);
						processedError.current.delete(index);
					},
					classNames: {
						toast: "!bg-error-foreground",
						title: "!text-error !text-md",
						icon: "!text-error",
					},
				});
			}
		});
		if (errors.length === 0) {
			processedError.current.clear();
		}
	}, [errors, removeError]);

	return null;
}
