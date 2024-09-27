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

const getProjectsDemo = () => {
  return [
    {
      icon: Settings,
      href: "/itaskdevdemo",
      name: "iTaskDev Demo",
      sdlc: "Scrum",
    },
    {
      icon: LayoutGrid,
      href: "/itaskdevdemo",
      name: "SpeakWiz",
      sdlc: "Scrum",
    },
    {
      icon: Rocket,
      href: "/itaskdevdemo",
      name: "DevEra",
      sdlc: "Scrum",
    },
    {
      icon: Mail,
      href: "/itaskdevdemo",
      name: "Google",
      sdlc: "Scrum",
    },
    {
      icon: ClipboardCheck,
      href: "/itaskdevdemo",
      name: "Youtube",
      sdlc: "Scrum",
    },
  ];
};

export default getProjectsDemo;
