import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import { useState, useRef, useEffect } from "react";

export const SearchBar = () => {
  const [value, setValue] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setValue(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="md:w-[400px] relative hidden lg:flex"
      ref={commandRef}
    >
      <Command>
        <CommandInput
          placeholder="Search for projects, features or settings"
          onClick={() => setValue(true)}
        />
        {value && (
          <CommandList className="absolute left-0 right-0 mt-10 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-[400px]">
            <CommandEmpty> No results found. </CommandEmpty>
            <CommandGroup heading="Feature">
              <CommandItem>
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <span>Tasks</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Setting">
              <CommandItem>
                <span>Notification Settings</span>
              </CommandItem>
              <CommandItem>
                <span>Account Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};
