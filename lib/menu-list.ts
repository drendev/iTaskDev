import {
  Settings,
  LayoutGrid,
  LucideIcon,
  Rocket,
  Mail,
  ClipboardCheck,
  Telescope,
  Shield,
} from "lucide-react";

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
          submenus: [],
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
          active: pathname.includes("/tasks"),
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
