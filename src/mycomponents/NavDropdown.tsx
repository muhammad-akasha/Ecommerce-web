"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useAuthenticate } from "../context/userContext.auth";

// Define the type for the `logout` function prop
interface DropdownMenuRadioGroupDemoProps {
  logout: () => void; // Define the type of `logout` as a function that takes no arguments and returns nothing
}

export function DropdownMenuRadioGroupDemo({
  logout,
}: DropdownMenuRadioGroupDemoProps) {
  const { user } = useAuthenticate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h2 className="text-white cursor-pointer hover:text-sky-400 flex gap-2 items-center">
          <img
            className="rounded-full w-10 h-10"
            src={
              user?.image ||
              `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1YslXPstvXAf87jHcero9lXOzjCFbIo-iZQ&s`
            }
            alt="profile"
          />
          {user?.userName}
        </h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>User Info</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioItem className="p-2" value="username">
          {user?.userName}
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem className="p-2" value="logout" onClick={logout}>
          Logout
        </DropdownMenuRadioItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
