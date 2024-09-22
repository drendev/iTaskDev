
import { auth } from '@/auth';

export const currentUserPages = async () => {
    const session = await auth();

    return session?.user;
}