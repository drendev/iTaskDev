'use client';

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const ToastHandler = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const success = searchParams ? searchParams.get('success') : null;
    const error = searchParams ? searchParams.get('error') : null;

    const toastShown = useRef(false);

    useEffect(() => {
        if (!toastShown.current) {
            if (success) {
                if (success === 'joined') {
                    toast.success('Successfully joined the project');
                } else if (success === 'already') {
                    toast.info('You are already a member of this project');
                } else if (success === 'pending') {
                    toast.info('Request to join the project has been sent');
                }

                const newSearchParams = searchParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
                newSearchParams.delete('success');
                router.replace(window.location.pathname + '?' + newSearchParams.toString(), { scroll: false });

                toastShown.current = true;
            } else if (error) {
                if (error === 'invalid') {
                    toast.error('Invalid/Expired Invite Link');
                } else if (error === 'already') {
                    toast.error('You are already sent a request to join this project');
                }

                const newSearchParams = searchParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
                newSearchParams.delete('error');
                router.replace(window.location.pathname + '?' + newSearchParams.toString(), { scroll: false });

                toastShown.current = true;
            }
        }
    }, [success, error, searchParams, router]);

    return null;
};

export default ToastHandler;
