"use client";

import * as React from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  PiHeadsetLight,
  PiCode,
  PiSparkleLight,
  PiCalendarDotsLight,
} from "react-icons/pi";

const components: { title: string; pass: string; color: string }[] = [
  {
    title: "Waterfall",
    pass: "waterfall",
    color: "border-l-4 border-blue-500 rounded-none hover:cursor-pointer",
  },
  {
    title: "Scrum",
    pass: "scrum",
    color: "border-l-4 border-amber-500 rounded-none hover:cursor-pointer",
  },
  {
    title: "Kanban",
    pass: "kanban",
    color: "border-l-4 border-cyan-500 rounded-none hover:cursor-pointer",
  },
  {
    title: "Spiral",
    pass: "spiral",
    color: "border-l-4 border-rose-500 rounded-none hover:cursor-pointer",
  },
  {
    title: "V-Shape",
    pass: "vshape",
    color: "border-l-4 border-pink-500 rounded-none hover:cursor-pointer",
  },
  {
    title: "Lean",
    pass: "lean",
    color: "border-l-4 border-red-500 rounded-none hover:cursor-pointer",
  },
  {
    title: "DevOps",
    pass: "devops",
    color: "border-l-4 border-violet-500 rounded-none hover:cursor-pointer",
  },
  {
    title: "Iterative",
    pass: "iterative",
    color: "border-l-4 border-lime-500 rounded-none hover:cursor-pointer",
  },
  {
    title: "RAD",
    pass: "rad",
    color: "border-l-4 border-teal-500 rounded-none hover:cursor-pointer",
  },
];

export function Menu() {
  const router = useRouter();

  const handleRedirect = (page: string): void => {
    // Construct the URL with query parameters as part of the string
    router.push(`/sdlc?page=${page}`);
  };

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex">
              <ul className="grid p-2 md:wd-[400px] lg:w-[250px] hover:cursor-pointer">
                <div className="flex items-center gap-1 hover:bg-gray-400/10 p-1 rounded-sm">
                  <PiCode className="text-2xl mr-2 text-blue-600" />
                  <Link href="/#projects">
                    <a>Projects</a>
                    <p className="text-gray-400 text-sm font-light">
                      {" "}
                      For every team or size
                    </p>
                  </Link>
                </div>
                <div className="flex items-center gap-1 hover:bg-gray-400/10 p-1 rounded-sm">
                  <PiHeadsetLight className="text-2xl mr-2 text-red-600" />
                  <Link href="/#communication">
                    <a>Communication</a>
                    <p className="text-gray-400 text-sm font-light">
                      {" "}
                      Collaborate effectively
                    </p>
                  </Link>
                </div>
                <div className="flex items-center gap-1 hover:bg-gray-400/10 p-1 rounded-sm">
                  <PiCalendarDotsLight className="text-2xl mr-2 text-green-600" />
                  <Link href="/#calendar">
                    <a>Calendar</a>
                    <p className="text-gray-400 text-sm font-light">
                      {" "}
                      Set-up your timeline
                    </p>
                  </Link>
                </div>
                <div className="flex items-center gap-1 hover:bg-gray-400/10 p-1 rounded-sm">
                  <PiSparkleLight className="text-2xl mr-2 text-purple-600" />
                  <Link href="/#ai">
                    <a>AI</a>
                    <p className="text-gray-400 text-sm font-light">
                      {" "}
                      Powered by NLP
                    </p>
                  </Link>
                </div>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>SDLC Library</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
              {components.map((component, index) => (
                <ListItem
                  key={index}
                  title={component.title}
                  onClick={() => handleRedirect(component.pass)}
                  className={component.color}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
