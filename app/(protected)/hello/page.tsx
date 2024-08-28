"use client";


import {logout} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";

const SettingsPage = () => {
    const session = useCurrentUser()

    const onClick = () => {
        logout();
    }

    return (
        <div>
            {JSON.stringify(session)}
            <button type="submit" onClick={onClick}>
                Sign Out
            </button>
        </div>
    )
}

export default SettingsPage;