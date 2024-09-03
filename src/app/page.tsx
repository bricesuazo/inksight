"use client";

import books from "../../data.json";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  BookOpenText,
  Filter,
  Search,
  X,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ClientOnly from "~/components/client-only";
import Link from "next/link";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { convertStringToArray } from "~/lib/utils";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function Home() {
  const uniqueGenres = Array.from(
    new Set(books.flatMap((book) => convertStringToArray(book.genres))),
  ).sort();
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(
    books.sort((a, b) => a.title.localeCompare(b.title)),
  );
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<string[]>(uniqueGenres);

  const sortBooks = (books: typeof filteredBooks) => {
    return [...books].sort((a, b) =>
      sortBy === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    );
  };

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchResults = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredBooks(sortBooks(searchResults));
  }

  const handleSort = () => {
    setSortBy(sortBy === "asc" ? "desc" : "asc");
    setFilteredBooks((prev) => sortBooks(prev));
  };

  const applyFilters = (selectedFilters: string[]) => {
    const filteredResults = books.filter(
      (book) =>
        selectedFilters.length === 0 ||
        convertStringToArray(book.genres).some((genre) =>
          selectedFilters.includes(genre),
        ),
    );
    setFilteredBooks(sortBooks(filteredResults));
  };

  return (
    <main>
      <div className="container mx-auto max-w-screen-lg space-y-5 p-4">
        <h1 className="text-balance py-20 text-center text-2xl font-bold">
          Your Digital Gateway to Book Discovery
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <div className="flex flex-1 gap-2">
            <Input
              placeholder="Search for a book"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.length > 0 && (
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => {
                        setFilteredBooks(books);
                        setSearch("");
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear search</TooltipContent>
                </Tooltip>
              </div>
            )}
            <Button type="submit">
              <Search className="mr-1.5 size-4" />
              Search
            </Button>
          </div>
          <div className="flex justify-end gap-2">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleSort}>
                    {sortBy === "asc" ? (
                      <ArrowDownAZ className="size-4" />
                    ) : (
                      <ArrowUpAZ className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Sort by name</TooltipContent>
              </Tooltip>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-1.5 size-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="space-y-2">
                    <span>Filter by genre</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setFilters(uniqueGenres);
                          setFilteredBooks(books);
                        }}
                        disabled={filters.length === uniqueGenres.length}
                      >
                        Select All
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setFilters([]);
                          setFilteredBooks([]);
                        }}
                        disabled={filters.length === 0}
                      >
                        Clear All
                      </Button>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-96">
                    {uniqueGenres.map((genre) => (
                      <DropdownMenuCheckboxItem
                        key={genre}
                        checked={filters.includes(genre)}
                        onCheckedChange={(checked) => {
                          const newFilters = checked
                            ? [...filters, genre]
                            : filters.filter((filter) => filter !== genre);
                          setFilters(newFilters);
                          applyFilters(newFilters);
                        }}
                      >
                        {genre}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </form>

        <div className="min-h-screen">
          {filteredBooks.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No books found. Please try again.
            </p>
          ) : (
            <ClientOnly>
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
                <Masonry gutter="16px">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.bookId}
                      className="flex gap-4 rounded-md border p-4"
                    >
                      <div className="relative aspect-[2/3] h-40">
                        <Image
                          src={book.coverImg}
                          alt={book.title}
                          fill
                          sizes="(max-width: 750px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="rounded object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{book.title}</p>
                        <p className="mb-2 text-sm text-secondary-foreground">
                          {book.author}
                        </p>

                        <p className="mb-5 line-clamp-4 text-sm text-muted-foreground">
                          {book.description}
                        </p>

                        <Button asChild>
                          <Link href={`/book/${book.bookId}`}>
                            <BookOpenText className="mr-1.5 size-4" />
                            Read More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </ClientOnly>
          )}
        </div>
      </div>
    </main>
  );
}
