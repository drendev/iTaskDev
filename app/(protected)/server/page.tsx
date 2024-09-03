import {currentUser} from "@/lib/auth";
import {UserInfo} from "@/components/user-info";

const ServerPage = async () => {
    const user = await currentUser();
    return (
        <div className="flex justify-center items-center">
            <UserInfo
            label="Server Component"
            user={user}
            />
        </div>
    )
}

export default ServerPage;