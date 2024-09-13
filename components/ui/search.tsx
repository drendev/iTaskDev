import * as React from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

  export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

  const Search = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          className={cn(
            "flex h-10 items-center rounded-md border border-input bg-gray-100 pl-3 text-sm ring-offset-background focus-within:shadow-md focus-within:bg-white",
            className,
          )}
        >
          <SearchIcon className="h-[16px] w-[16px]" />
          <input
            {...props}
            type="search"
            ref={ref}
            className="w-full bg-gray-100 p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-within:bg-white"
          />
        </div>
      );
    },
  );
  
  Search.displayName = "Search";
  
  export { Search };
