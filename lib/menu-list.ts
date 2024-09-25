import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  House,
  Rocket,
  Mail,
  ClipboardCheck,
  Telescope,
  Shield,
} from "lucide-react";

import {
  GoBeaker,
  GoHome,
  GoMention,
  GoRepo,
  GoRocket,
  GoShieldLock,
  GoStack,
} from "react-icons/go";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/projects",
          label: "Projects",
          active: pathname.includes("/projects"),
          icon: Rocket,
          submenus: [
            // {
            //   href: "/posts",
            //   label: "All Posts",
            //   active: pathname === "/posts",
            // },
            // {
            //   href: "/posts/new",
            //   label: "New Post",
            //   active: pathname === "/posts/new",
            // },
          ],
        },
        {
          href: "/messages",
          label: "Messages",
          active: pathname.includes("/messages"),
          icon: Mail,
          submenus: [],
        },
        {
          href: "/tasks",
          label: "Tasks",
          active: pathname.includes("/tags"),
          icon: ClipboardCheck,
          submenus: [],
        },
        {
          href: "/tags",
          label: "Discover",
          active: pathname.includes("/tags"),
          icon: Telescope,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Security",
          active: pathname.includes("/users"),
          icon: Shield,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
