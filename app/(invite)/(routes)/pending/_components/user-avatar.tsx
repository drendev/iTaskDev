import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
    src?: string;
    className?: string;
    fallback?: string;
}

export const UserAvatar = ({
    src,
    className,
    fallback
}: UserAvatarProps) => {
    return(
        <Avatar className={cn(
            "w-8 h-8",
            className
        )}>
            <AvatarImage src={src} />
            <AvatarFallback>
                {fallback}
            </AvatarFallback>
        </Avatar>
    )
}