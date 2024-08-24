
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button"
import Link from "next/link"
export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
        >
            <div className="w-full flex justify-center items-center">
                Your email is registered within Google or Github.
            </div>
            <Button
                variant="link"
                className="font-normal w-full"
                size="sm"
                asChild
            >
                <Link href="/auth/login">
                    Back to Login Page
                </Link>
            </Button>
        </CardWrapper>
    );
};
