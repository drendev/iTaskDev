"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  PiHeadsetLight,
  PiFileThin,
  PiCode,
  PiSparkleLight,
  PiTargetLight,
  PiCalendarDotsLight,
} from "react-icons/pi";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Scrum",
    href: "/sdlc",
    description:
      "An agile method using short sprints for iterative software development",
  },
  {
    title: "Waterfall",
    href: "/sdlc/waterfall",
    description: "Linear, sequential development approach",
  },
  {
    title: "Spiral",
    href: "/sdlc/spiral",
    description: "Combines iterative development with risk assessment.",
  },
  {
    title: "V-shape",
    href: "/sdlc/vshape",
    description: "Linear model with development and testing phases in parallel",
  },
  {
    title: "Lean",
    href: "/sdlc/lean",
    description:
      "Maximizes value by minimizing waste in the development process",
  },
  {
    title: "DevOps",
    href: "/sdlc/devops",
    description:
      "Development and operations for continuous delivery and collaboration",
  },
  {
    title: "Iterative",
    href: "/sdlc/iterative",
    description:
      "develops software through repeated cycles, refining with each iteration",
  },
  {
    title: "RAD",
    href: "/sdlc/rad",
    description: "Rapid development with iterative prototyping",
  },
  {
    title: "Kanban",
    href: "/sdlc/kanban",
    description: "Rapid development with iterative prototyping",
  },
];

export function Menu() {
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
          <NavigationMenuTrigger>SDLC Templates</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
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
