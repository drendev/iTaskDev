"use client";

import { usePathname } from "next/navigation";
import { GoBeaker, GoHome, GoMention, GoRepo, GoRocket, GoShieldLock, GoStack } from "react-icons/go";
import { NavLinks } from "./sidebar-utils";

const NavPaths = [
    {key: 0, label: 'Home', path: '/home', icon: <GoHome className="w-5 h-5"/>},
    {key: 1, label: 'Projects', path: '/projects', icon: <GoRocket className="w-5 h-5"/>, multiple: true},
    {key: 2, label: 'Messages', path: '/workspace', icon: <GoRepo className="w-5 h-5"/>},
    {key: 1, label: 'Tasks', path: '/communicate', icon: <GoStack className="w-5 h-5"/>},
    {key: 1, label: 'Discover', path: '/discover', icon: <GoBeaker className="w-5 h-5"/>},
    {key: 1, label: 'Security', path: '/security', icon: <GoShieldLock className="w-5 h-5"/>},
    {key: 1, label: 'Account', path: '/account', icon: <GoMention className="w-5 h-5"/>}
]

export const SideBar = () => {

    const pathName = usePathname();

    return (
        <>
            {NavPaths.map((labels) => {
                const isActive = pathName === labels.path || pathName.startsWith(labels.path.length > 1 ? labels.path : labels.path + '/');

                return (
                    <NavLinks
                    key={labels.key}
                    path={labels.path}
                    active={isActive}
                    >
                        <div className="flex space-x-3 items-center">
                            <div>
                                {labels.icon}
                            </div>
                            <div>
                                {labels.label}
                            </div>
                        </div>
                    </NavLinks>
                )
            })}
        </>
    )
}