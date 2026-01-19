"use client";


import { UserNav } from "./user-nav";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "../theme-toggle";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <div className="w-full flex-1">
        <SearchBar />
      </div>
      <ThemeToggle />
      <UserNav />
    </header>
  );
}
