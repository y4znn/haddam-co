"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ToastOnMount({ message }: { message: string }) {
    useEffect(() => {
        toast.info(message, {
            duration: 4000,
        });
    }, [message]);

    return null;
}
