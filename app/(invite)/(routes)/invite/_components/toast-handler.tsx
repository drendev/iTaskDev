'use client';

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const ToastHandler = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    const toastShown = useRef(false);

    useEffect(() => {
        if (!toastShown.current) {
            if (success) {
                if (success === 'joined') {
                    toast.success('Successfully joined the project');
                } else if (success === 'already') {
                    toast.info('You are already a member of this project');
                }

                // Remove the success parameter from the URL
                const newSearchParams = new URLSearchParams(searchParams.toString());
                newSearchParams.delete('success');
                router.replace(window.location.pathname + '?' + newSearchParams.toString(), { scroll: false });

                toastShown.current = true;
            } else if (error) {
                if (error === 'invalid') {
                    toast.error('Invalid/Expired Invite Link');
                }

                // Remove the error parameter from the URL
                const newSearchParams = new URLSearchParams(searchParams.toString());
                newSearchParams.delete('error');
                router.replace(window.location.pathname + '?' + newSearchParams.toString(), { scroll: false });

                toastShown.current = true;
            }
        }
    }, [success, error, searchParams, router]);

    return null;
};

export default ToastHandler;
